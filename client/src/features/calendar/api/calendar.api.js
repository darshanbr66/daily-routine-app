import api from "@/api/axios";

/**
 * Get Events
 */
export const getEvents = async ({
  search = "",
  type = "",
  startDate = "",
  endDate = "",
  sort = "date",
} = {}) => {
  const response = await api.get("/events", {
    params: {
      search,
      type,
      startDate,
      endDate,
      sort,
    },
  });

  return response.data;
};

/**
 * Get Single Event
 */
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

/**
 * Create Event
 */
export const createEvent = async (event) => {
  const response = await api.post("/events", event);
  return response.data;
};

/**
 * Update Event
 */
export const updateEvent = async ({ id, data }) => {
  const response = await api.put(
    `/events/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete Event
 */
export const deleteEvent = async (id) => {
  const response = await api.delete(
    `/events/${id}`
  );

  return response.data;
};