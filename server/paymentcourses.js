const mongoose = require('mongoose');

const paymentcourse = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // optional, references your users collection
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
