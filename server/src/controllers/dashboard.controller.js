const dashboardService = require("../services/dashboard.service");

const getSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getSummary(req.user.id);

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSummary,
};