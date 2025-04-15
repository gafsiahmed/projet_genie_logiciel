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
import annoucementsRouter from "./routes/annonce.route";
import authRouter from "./routes/auth.route";
import calendarRouter from "./routes/calendar.route";
import devisRouter from "./routes/devis.route";
import employeeRouter from "./routes/employee.route";
import evaluationRouter from "./routes/evaluation.route";
import expensesRouter from "./routes/expenses.route";
import incomesRouter from "./routes/incomes.route";
import instructorRouter from "./routes/instructor.route";
import invoiceRouter from "./routes/invoice.route";
import newsletterRouter from "./routes/newsletter.route";
import paymentsRouter from "./routes/payment.route";
import studentrouter from "./routes/student.route";
import trainingrouter from "./routes/training.route";
import trainingSessions from "./routes/trainingSessions.route";
import transactions from "./routes/transactions.route";
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
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})();

app.get("/", (req: Request, res: Response) => {
  res.send(" <h1> Server is Running correctly ✅ </h1> ");
});

//--------------users endpoint----------------
app.use("/api/users", userRouter);
//--------------login endpoint----------------
app.use("/api", authRouter);
//--------------trainings endpoint------------
app.use("/api/trainings", trainingrouter);
//--------------students endpoint----------
app.use("/api/students", studentrouter);
//----------------intructors endpoint ----------------
app.use("/api/instructors", instructorRouter);
//---------------- employee invoices----------------
app.use("/api/employees", employeeRouter);
//----------------invoices invoices ----------------
app.use("/api/invoices", invoiceRouter);
//----------------Devis invoices ----------------
app.use("/api/devis", devisRouter);
// ----------------Training Sessions invoices ----------------
app.use("/api/trainingsessions", trainingSessions);
// ----------------Transactions invoices ----------------
app.use("/api/transactions", transactions);
//----------------- Calendar Events endpoint ----------------
app.use("/api/calendar/events", calendarRouter);
//--------------Incomes endpoint----------------
app.use("/api/incomes", incomesRouter);
//----------------- Expenses endpoint ----------------
app.use("/api/expenses", expensesRouter);
//----------------- annonces endpoint ----------------
app.use("/api/annoucements", annoucementsRouter);
//--------------evaluation endpoint----------------
app.use("/api/evaluation", evaluationRouter);
//--------------payments endpoint----------------
app.use("/api/payments", paymentsRouter);
//--------------newsletter endpoint----------------
app.use("/api/newsletters", newsletterRouter);

// creating the 404 middleware to handle requestest for non exsiting endpoints
app.use((req, res, next) => {
  next(
    new BaseError(404, "Endpoint not found", {
      Error: " The endpoint you are trying to reach does not exist",
    })
  );
});
