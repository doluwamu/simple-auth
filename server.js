import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import userQuery from "./queries/userQueries.js";

import userRoutes from "./userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = process.env || 4343;

// ROUTES

app.use("/users", userRoutes);

app.listen(PORT, console.log(`app listening on port ${PORT}`));
