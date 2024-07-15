import Payment from "../models/payment.js";

export const addPayment = async (req, res) => {
    const { user, amount, paymentMethod, paymentDate, status } = req.body;

    if (!user || !amount || !paymentMethod || !paymentDate || !status) {
        return res.status(400).json({ message: "Invalid input" });
    }

    let payment;
    try {
        payment = new Payment({
            user,
            amount,
            paymentMethod,
            paymentDate,
            status
        });
        await payment.save();
    } catch (err) {
        return res.status(500).json({ message: "Adding payment failed" });
    }

    return res.status(201).json({ payment });
};

export const getPayments = async (req, res) => {
    let payments;
    try {
        payments = await Payment.find();
    } catch (err) {
        return res.status(500).json({ message: "Fetching payments failed" });
    }
    return res.status(200).json({ payments });
};
