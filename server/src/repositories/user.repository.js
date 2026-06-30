const User = require("../models/User");

const findByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = (userData) => {
  return User.create(userData);
};

const findById = (id) => {
  return User.findById(id);
};

module.exports = {
  findByEmail,
  createUser,
  findById,
};