import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import Package from '../models/Package.js';
import Admin from '../models/Admin.js';
export const addPackage = async (req, res, next) => {
    const extractedToken = req.headers.authorization?.split(" ")[1];
    if (!extractedToken) {
        return res.status(404).json({ message: "Token Not Found" });
    }

    let adminId;
    try {
        const decoded = await jwt.verify(extractedToken, process.env.SECRET_KEY);
        adminId = decoded.id;
    } catch (err) {
        return res.status(400).json({ message: `${err.message}` });
    }

    const { title, description, packageDate, posterUrl, featured, places } = req.body;
    if (
        !title || title.trim() === "" || 
        !description || description.trim() === "" || 
        !posterUrl || posterUrl.trim() === "" ||
        !places || !Array.isArray(places) || places.length === 0
    ) {
        return res.status(422).json({ message: "Invalid Inputs" });
    }

    let packages;
    try {
        packages = new Package({
            title,
            description,
            packageDate: new Date(packageDate),
            posterUrl,
            featured,
            places,
            admin: adminId,
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        const adminUser = await Admin.findById(adminId);
        if (!adminUser) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Admin not found" });
        }
        await packages.save({ session });
        adminUser.addedPackages.push(packages);
        await adminUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return res.status(500).json({ message: "Request Failed", error: err.message });
    }

    return res.status(201).json({ packages });
};


export const getAllpackagess = async (req, res, next) => {
    let packagess;
    try {
        packagess = await Package.find();
    } catch (err) {
        return res.status(500).json({ message: 'Request Failed', error: err.message });
    }
    if (!packagess) {
        return res.status(404).json({ message: 'No Packages Found' });
    }
    return res.status(200).json({ packagess });
};

export const getPackageById = async (req, res, next) => {
    const id = req.params.id;
    let packagess;
    try {
        packagess = await Package.findById(id);
    } catch (err) {
        return res.status(500).json({ message: 'Request Failed', error: err.message });
    }
    if (!packagess) {
        return res.status(404).json({ message: "Invalid Package ID" });
    }
    return res.status(200).json({ packagess });
};
