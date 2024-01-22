import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.send("Welcome to promptionary's backend!"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
