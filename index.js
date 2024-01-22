import express from "express";
import userRoutes from "./routes/userRoutes.js";
import gameRoomRoutes from "./routes/gameRoomRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/gamerooms", gameRoomRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
