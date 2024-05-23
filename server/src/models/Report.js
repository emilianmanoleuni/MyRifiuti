const mongoose = require('mongoose')
const Zone = require('./Zone')
const Status = require('./ReportStatus')

// Report schema
const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  title: {
    type: String,
    required: true,
    unique: false,
    trim: false
  },
  road: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  roadNumber: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  cap: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  zone: {
    type: String,
    enum: Zone.zones,
    required: true,
    unique: false,
    trim: true
  },
  description: {
    type: String,
    unique: false,
    required: true,
    trim: false
  },
  status: {
    type: String,
    enum: Status.status,
    unique: false,
    required: true,
    trim: false
  },
  user: {
    type: String,
    unique: false,
    required: true,
    trim: true
  }
}, { timestamps: true }); // `timestamps` add `createdAt` and `updatedAt`

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

