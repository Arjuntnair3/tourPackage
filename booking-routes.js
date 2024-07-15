import express from 'express';
import { deleteBooking, getBookingById, newBooking } from '../controllers/booking-controller.js';

const bookingsRouter = express.Router();

bookingsRouter.get('/:id', getBookingById);
bookingsRouter.post('/', newBooking);
bookingsRouter.delete("/:id", deleteBooking); // Ensure this endpoint is correctly defined

export default bookingsRouter;
