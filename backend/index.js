import express from "express";
import { createConnection } from "mysql2";

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
    console.log(err);
    return;
  }
  console.log("Connected with MySql...");
});

const app = express();
const port = 3300;

// Get all subjects
app.get("/getsubjects", (req, res) => {
  const query =
    "SELECT s.*, t.* " +
    "FROM subjects as s, teacher as t " +
    "WHERE s.id_teacher = t.id ";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});

// Get subject by id
app.get("/getsubject/:id", (req, res) => {
  const query =
    "SELECT s.*, t.* " +
    "FROM subjects as s, teacher as t " +
    "WHERE s.id_teacher = t.id " +
    `AND s.id = ${req.params.id}`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
