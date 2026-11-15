import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hi there from server");
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
