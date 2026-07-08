const eventRepository = require("../repositories/event.repository");

const createEvent = async (userId, body) => {
  return await eventRepository.createEvent({
    ...body,
    user: userId,
  });
};

const getMyEvents = async (
  userId,
  filters = {}
) => {
  return await eventRepository.getEventsByUser(
    userId,
    filters
  );
};

const getEventById = async (
  eventId,
  userId
) => {
  const event = await eventRepository.getEventById(
    eventId,
    userId
  );

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

const updateEvent = async (
  eventId,
  userId,
  body
) => {
  const event = await eventRepository.updateEvent(
    eventId,
    userId,
    body
  );

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

const deleteEvent = async (
  eventId,
  userId
) => {
  const event = await eventRepository.deleteEvent(
    eventId,
    userId
  );

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

module.exports = {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};