import express from "express";
import db from "../config/index.js";

const router = express.Router();

// Get all subjects
router.get("/getsubjects", (req, res) => {
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
router.get("/getsubjects/:id", (req, res) => {
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

export default router;
