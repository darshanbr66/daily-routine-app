const {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
} = require("../repositories/routine.repository");

/**
 * Create Routine
 */
const createRoutineService = async (
  userId,
  routineData
) => {
  return await createRoutine({
    ...routineData,
    user: userId,
  });
};

/**
 * Get All Routines
 */
const getRoutinesService = async (
  userId,
  filters
) => {
  return await getRoutines(
    userId,
    filters
  );
};

/**
 * Get Routine By ID
 */
const getRoutineByIdService = async (
  routineId,
  userId
) => {
  const routine =
    await getRoutineById(
      routineId,
      userId
    );

  if (!routine) {
    throw new Error(
      "Routine not found."
    );
  }

  return routine;
};

/**
 * Update Routine
 */
const updateRoutineService = async (
  routineId,
  userId,
  updateData
) => {
  const routine =
    await updateRoutine(
      routineId,
      userId,
      updateData
    );

  if (!routine) {
    throw new Error(
      "Routine not found."
    );
  }

  return routine;
};

/**
 * Delete Routine
 */
const deleteRoutineService = async (
  routineId,
  userId
) => {
  const routine =
    await deleteRoutine(
      routineId,
      userId
    );

  if (!routine) {
    throw new Error(
      "Routine not found."
    );
  }

  return routine;
};

module.exports = {
  createRoutineService,
  getRoutinesService,
  getRoutineByIdService,
  updateRoutineService,
  deleteRoutineService,
};