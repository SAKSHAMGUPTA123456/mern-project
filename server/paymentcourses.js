const mongoose = require('mongoose');

const paymentcourse = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const payedcourses = mongoose.model('paymentcourses', paymentcourse);
module.exports = payedcourses;
