const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;