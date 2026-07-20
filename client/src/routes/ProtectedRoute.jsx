import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingState from "@/components/common/LoadingState";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    initialized,
  } = useSelector((state) => state.auth);

  /**
   * Wait until authentication
   * restoration finishes.
   */
  if (!initialized) {
    return (
      <LoadingState message="Restoring your session..." />
    );
  }

  /**
   * User is not authenticated.
   */
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /**
   * User is authenticated.
   */
  return children;
}

export default ProtectedRoute;