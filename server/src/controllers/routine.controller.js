const {
  createRoutineService,
  getRoutinesService,
  getRoutineByIdService,
  updateRoutineService,
  deleteRoutineService,
} = require("../services/routine.service");

/**
 * Create Routine
 * POST /api/v1/routines
 */
const createRoutine = async (req, res) => {
  try {
    const routine = await createRoutineService(
      req.user.id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Routine created successfully.",
      data: routine,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Routines
 * GET /api/v1/routines
 */
const getRoutines = async (req, res) => {
  try {
    const routines = await getRoutinesService(
      req.user.id,
      req.query
    );

    return res.status(200).json({
      success: true,
      count: routines.length,
      data: routines,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Routine By ID
 * GET /api/v1/routines/:id
 */
const getRoutineById = async (req, res) => {
  try {
    const routine = await getRoutineByIdService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      data: routine,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Routine
 * PUT /api/v1/routines/:id
 */
const updateRoutine = async (req, res) => {
  try {
    const routine = await updateRoutineService(
      req.params.id,
      req.user.id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Routine updated successfully.",
      data: routine,
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Routine
 * DELETE /api/v1/routines/:id
 */
const deleteRoutine = async (req, res) => {
  try {
    await deleteRoutineService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Routine deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createRoutine,
  getRoutines,
  getRoutineById,
  updateRoutine,
  deleteRoutine,
};