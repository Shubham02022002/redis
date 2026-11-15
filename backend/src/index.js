import express, {} from "express";
import { createClient } from "redis";
const app = express();
const PORT = 3000;
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));
app.get("/", async (req, res) => {
    const { problemId, userId, code, language } = req.body;
    try {
        await client.lPush("problems", JSON.stringify({ problemId, userId, code, language }));
        res.json({ message: "Submission recived." });
    }
    catch (error) {
        console.error("Redis error: ", error);
        res.status(500).json({ message: "Submission failed." });
    }
    res.send("Hi there from server");
});
app.post("/submit", (req, res) => { });
async function startInstance() {
    try {
        console.log("Connecting to Redis client...");
        await client.connect();
        console.log("Redis client connected.");
        app.listen(PORT, () => {
            console.log(`Server is up on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to connect redis", error);
    }
}
startInstance();
//# sourceMappingURL=index.js.map