const express = require("express");
const app = express();

const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

app.use(cors());

dotenv.config();

app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/v1/api/ranking", (req, res) => {
  pool.query(
    `SELECT username, score, updated_at 
    FROM ranking 
    ORDER BY score DESC, updated_at ASC;`,
    (error, results) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(201).json({
        results,
      });
    }
  );
});

app.post("/v1/api/ranking-add", (req, res) => {
  const { username, score } = req.body;
  pool.query(
    `INSERT INTO ranking (username, score, added_at, updated_at)
    VALUES (?, ?, NOW(), NOW())
    ON DUPLICATE KEY UPDATE 
    score = VALUES(score), updated_at = NOW();`,
    [username, score],
    (error, results) => {
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      res.status(201).json({
        results,
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
