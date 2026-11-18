import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { createClient } from "redis";

const app: Application = express();
app.use(express.json());

const PORT = 3000;

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
client.on("error", (err) => console.log("Redis Client Error", err));

app.post("/submit", async (req: Request, res: Response) => {
  const { problemId, userId, code, language } = req.body;

  try {
    await client.lPush(
      "problems",
      JSON.stringify({ problemId, userId, code, language }),
    );
    return res.json({ message: "Submission recived." });
  } catch (error) {
    console.error("Redis error: ", error);
    res.status(500).json({ message: "Submission failed." });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there from server");
});

async function startInstance() {
  try {
    console.log("Connecting to Redis client...");
    await client.connect();
    console.log("Redis client connected.");
    app.listen(PORT, () => {
      console.log(`Server is up on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect redis", error);
  }
}

startInstance();
