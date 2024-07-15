import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import Package from "../models/Package.js";

export const newBooking = async (req, res, next) => {
    const { packages, date, packageNumber, user } = req.body;
    let existingPackage;
    let existingUser;

    try {
        existingPackage = await Package.findById(packages);
        existingUser = await User.findById(user);
    } catch (err) {
        return res.status(500).json({ message: "Fetching data failed" });
    }

    if (!existingPackage) {
        return res.status(404).json({ message: "Package Not Found With Given ID" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User Not Found With Given ID" });
    }

    let booking;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        booking = new Bookings({
            packages,
            date: new Date(date),
            packageNumber: Number(packageNumber),
            user
        });

        existingUser.bookings.push(booking);
        existingPackage.bookings.push(booking);

        await existingUser.save({ session });
        await existingPackage.save({ session });
        await booking.save({ session });

        await session.commitTransaction();
    } catch (err) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Creating booking failed" });
    } finally {
        session.endSession();
    }

    return res.status(201).json({ booking });
};

export const getUserBookings = async (req, res, next) => {
    const userId = req.params.id;
    let userWithBookings;
    try {
        userWithBookings = await User.findById(userId).populate({
            path: 'bookings',
            populate: {
                path: 'packages',
                model: 'Package',
            },
        });
    } catch (err) {
        return res.status(500).json({ message: "Fetching user bookings failed" });
    }
    if (!userWithBookings) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: userWithBookings });
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findById(id);
    } catch (err) {
        return res.status(500).json({ message: "Fetching booking failed" });
    }
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
    const { id } = req.params;
    console.log(`Attempting to delete booking with id: ${id}`); // Log the ID being passed

    const session = await mongoose.startSession(); 
    session.startTransaction();

    try {
        const booking = await Bookings.findById(id).populate('user').populate('packages');

        if (!booking) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.user.bookings.pull(booking);
        await booking.packages.bookings.pull(booking);
        await booking.user.save({ session });
        await booking.packages.save({ session });

        await Bookings.findByIdAndDelete(id, { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error deleting booking:', err);
        return res.status(500).json({ message: 'Failed to delete booking' });
    }
};
