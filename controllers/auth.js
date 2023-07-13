import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

export const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user });
    // res.send("Yayyy")
};

export const login = async (req, res) => {
    res.send("login user");
};

