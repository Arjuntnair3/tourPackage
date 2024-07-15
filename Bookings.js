
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    packages: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    packageNumber: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;