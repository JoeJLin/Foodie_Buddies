const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = mongoose.Schema({});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
