const Routine = require("../models/Routine");

/**
 * Create Routine
 */
const createRoutine = async (routineData) => {
  return await Routine.create(routineData);
};

/**
 * Get All Routines
 */
const getRoutines = async (
  userId,
  filters = {}
) => {
  const query = {
    user: userId,
  };

  if (filters.search) {
    query.$or = [
      {
        name: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  if (filters.timeOfDay) {
    query.timeOfDay = filters.timeOfDay;
  }

  if (
    filters.isActive !== undefined &&
    filters.isActive !== ""
  ) {
    query.isActive =
      filters.isActive === "true";
  }

  return await Routine.find(query).sort({
    isActive: -1,
    updatedAt: -1,
  });
};

/**
 * Get Routine By ID
 */
const getRoutineById = async (
  routineId,
  userId
) => {
  return await Routine.findOne({
    _id: routineId,
    user: userId,
  });
};

/**
 * Update Routine
 */
const updateRoutine = async (
  routineId,
  userId,
  updateData
) => {
  return await Routine.findOneAndUpdate(
    {
      _id: routineId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Delete Routine
 */
const deleteRoutine = async (
  routineId,
  userId
) => {
  return await Routine.findOneAndDelete({
    _id: routineId,
    user: userId,
  });
};

module.exports = {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
};