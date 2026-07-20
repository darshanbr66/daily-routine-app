import { tokenService } from "./token.service";

let isRefreshing = false;
let failedQueue = [];

const redirectToLogin = () => {
  tokenService.clear();
  window.location.href = "/login";
};

/**
 * Process queued requests
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Setup Authentication Interceptors
 */
export const setupAuthInterceptor = (api) => {
  /**
   * Refresh Access Token
   */
  const refreshAccessToken = async () => {
    const response = await api.post("/auth/refresh");

    const accessToken = response.data.accessToken;

    tokenService.setAccessToken(accessToken);

    return accessToken;
  };

  /**
   * Request Interceptor
   */
  api.interceptors.request.use(
    (config) => {
      const accessToken =
        tokenService.getAccessToken();

      if (accessToken) {
        config.headers.Authorization =
          `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /**
   * Response Interceptor
   */
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error?.config;

      if (
        error.response?.status !== 401 ||
        originalRequest?._retry
      ) {
        return Promise.reject(error);
      }

      /**
       * Don't refresh refresh-token request
       */
      if (
        originalRequest.url?.includes("/auth/refresh")
      ) {
        tokenService.clear();

        redirectToLogin();

        return Promise.reject(error);
      }

      /**
       * Queue requests while refreshing
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then((token) => {
          originalRequest.headers.Authorization =
            `Bearer ${token}`;

          return api(originalRequest);
        });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        const newAccessToken =
          await refreshAccessToken();

        processQueue(
          null,
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        tokenService.clear();

        redirectToLogin();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};