import express from "express";
import { createConnection } from "mysql2";
import subjectRoutes from "../routes/subjects.js";

// Create connection
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unidb",
});

// Connect to MySql
db.connect((err) => {
  if (err) {
    console.log("Couldn't connect with MySql", err.message);
    return;
  }
  console.log("Connected with MySql...");
});

const app = express();
const port = 5000;

// Using routes
app.use("/", subjectRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});

export default db;
