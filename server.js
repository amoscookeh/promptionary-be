import express from "express";

const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Hello from Bun and Express!"));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
