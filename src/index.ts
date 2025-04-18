import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import "dotenv/config";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import BaseError from "./config/baseError";
import connectToDatabase from "./config/dbconnection";
import error from "./middleware/error";

//routers import
import calendarRouter from "./routes/admin/calendar.route";
import devisRouter from "./routes/admin/devis.route";
import employeeRouter from "./routes/admin/employee.route";
import instructorRouter from "./routes/admin/instructor.route";
import invoiceRouter from "./routes/admin/invoice.route";
import studentrouter from "./routes/admin/student.route";
import trainingrouter from "./routes/admin/training.route";
import trainingSessions from "./routes/admin/trainingSessions.route";
import transactions from "./routes/admin/transactions.route";
import authRouter from "./routes/auth.route";
import annoucementsRouter from "./routes/instructor/annonce.route";
import evaluationRouter from "./routes/instructor/evaluation.route";
import userRouter from "./routes/user.route";

// requiring the dotenv file
require("dotenv").config({ path: "./.env" });
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(helmet());

// using the error middleware that we created
app.use(error);

const { PORT } = process.env;
// annonymous function for the database connection
(async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} ✅`);
  });
})();

app.get("/", (req: Request, res: Response) => {
  res.send(" <h1> Server is Running correctly ✅ </h1> ");
});
//--------------login endpoint---------------- all users 
app.use("/api", authRouter);
//--------------users endpoint---------------- all users
app.use("/api/users", userRouter);
//--------------students endpoint---------- admin
app.use("/api/students", studentrouter);
//----------------intructors endpoint ---------------- admin done in oop ✅
app.use("/api/instructors", instructorRouter);
//--------------trainings endpoint------------  admin
app.use("/api/trainings", trainingrouter);
// ----------------Training Sessions invoices ---------------- admin
app.use("/api/trainingsessions", trainingSessions);
//---------------- employee invoices---------------- admin
app.use("/api/employees", employeeRouter);
// ----------------Transactions invoices ---------------- admin
// Update these routes to use the transaction controller
app.use("/api/transactions", transactions);
//----------------invoices invoices ---------------- admin
app.use("/api/invoices", invoiceRouter);
//----------------Devis invoices ---------------- admin
app.use("/api/devis", devisRouter);
//----------------- Calendar Events endpoint ----------------  admin
app.use("/api/calendar/events", calendarRouter);

//----------------- annonces endpoint ---------------- instructor
app.use("/api/annoucements", annoucementsRouter);
//--------------evaluation endpoint---------------- instructor
app.use("/api/evaluation", evaluationRouter);
//--------------payments endpoint---------------- admin
// app.use("/api/payments", paymentsRouter);

// creating the 404 middleware to handle requestest for non exsiting endpoints
app.use((req, res, next) => {
  next(
    new BaseError(404, "Endpoint not found", {
      Error: " The endpoint you are trying to reach does not exist",
    })
  );
});
