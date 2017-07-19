var mongoose = require('mongoose');

var Salary = mongoose.model('salaries', {
    year: Number,
    location: String,
    occ_title: String,
    jobs_1000: Number,
    h_mean: Number,
    a_mean: Number,
    h_pct10: Number,
    h_pct25: Number,
    h_median: Number,
    h_pct75: Number,
    h_pct90: Number,
    a_pct10: Number,
    a_pct25: Number,
    a_median: Number,
    a_pct75: Number,
    a_pct90: Number,
    annual: String,
    hourly: String,
}, 'salary');

module.exports = { Salary };