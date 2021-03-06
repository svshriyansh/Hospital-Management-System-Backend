const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { dbuser, dbPassword } = process.env;
const url = `mongodb+srv://${dbuser}:${dbPassword}@cluster0.gpzb5.mongodb.net/SignUp-SignIn`;
const routes = require("./routes/auth");
const hospitalRoutes = require("./routes/hospital");
const patientRoutes = require("./routes/patients");
const recordRoutes = require("./routes/medicalRecords");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected...");
    },
    (err) => {
      console.log("Error found", err);
    }
  );

app.use("/", routes);
app.use("/hospital", hospitalRoutes);
app.use("/patient", patientRoutes);
app.use("/records", recordRoutes);

app.listen(8000, () => {
  console.log("Server Connected");
});
