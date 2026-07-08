const Event = require("../models/Event");

const createEvent = (data) => {
  return Event.create(data);
};

const getEventsByUser = (
  userId,
  {
    search = "",
    type = "",
    startDate,
    endDate,
    sort = "date",
  } = {}
) => {
  const query = {
    user: userId,
  };

  // Search
  if (search.trim()) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Event Type
  if (type) {
    query.type = type;
  }

  // Date Range
  if (startDate || endDate) {
    query.date = {};

    if (startDate) {
      query.date.$gte = new Date(startDate);
    }

    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  let sortQuery = {};

  switch (sort) {
    case "title":
      sortQuery = { title: 1 };
      break;

    case "priority":
      sortQuery = { priority: -1 };
      break;

    case "newest":
      sortQuery = { createdAt: -1 };
      break;

    case "oldest":
      sortQuery = { createdAt: 1 };
      break;

    case "date":
    default:
      sortQuery = {
        date: 1,
        startTime: 1,
      };
      break;
  }

  return Event.find(query)
    .populate("linkedTask", "title status")
    .populate("linkedHabit", "name")
    .populate("linkedGoal", "title")
    .sort(sortQuery);
};

const getEventById = (eventId, userId) => {
  return Event.findOne({
    _id: eventId,
    user: userId,
  })
    .populate("linkedTask", "title status")
    .populate("linkedHabit", "name")
    .populate("linkedGoal", "title");
};

const updateEvent = (
  eventId,
  userId,
  updateData
) => {
  return Event.findOneAndUpdate(
    {
      _id: eventId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteEvent = (
  eventId,
  userId
) => {
  return Event.findOneAndDelete({
    _id: eventId,
    user: userId,
  });
};

module.exports = {
  createEvent,
  getEventsByUser,
  getEventById,
  updateEvent,
  deleteEvent,
};