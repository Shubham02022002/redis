import express, {} from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hi there from server");
});
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
//# sourceMappingURL=index.js.map