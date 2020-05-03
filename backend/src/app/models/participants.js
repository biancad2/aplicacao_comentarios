const mongoose = require('../../database');

const ParticipantSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});


const Participant = mongoose.model('Participant', ParticipantSchema);

module.exports = Participant;