const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyEvents = async (req, res) => {
  try {
    const {
      search = "",
      type = "",
      startDate = "",
      endDate = "",
      sort = "date",
    } = req.query;

    const events = await eventService.getMyEvents(
      req.user.id,
      {
        search,
        type,
        startDate,
        endDate,
        sort,
      }
    );

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventService.getEventById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await eventService.updateEvent(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await eventService.deleteEvent(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getMyEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};