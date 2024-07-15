import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Booking from '../models/Booking.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createPDF = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const booking = await Booking.findById(bookingId).populate('packages');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const html = `
            <html>
                <body>
                    <h1>Booking Details</h1>
                    <p>Package: ${booking.packages.title}</p>
                    <p>Booking Date: ${booking.date}</p>
                    <p>Number of Guests: ${booking.packageNumber}</p>
                    <p>Total Price: ${booking.price}</p>
                </body>
            </html>
        `;

        const options = { format: 'A4' };

        pdf.create(html, options).toFile('invoice.pdf', (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'PDF creation failed' });
            }
            res.status(200).sendFile(path.join(__dirname, '../invoice.pdf'));
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};
