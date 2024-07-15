import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    places: {
        type: [String], // Update this line
        required: true
    },
    packageDate: {
        type: Date,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
