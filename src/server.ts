import express from "express";

const app = express();
const port: string | number = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("OK"));
app.listen(port, () => console.log(`App listening at ${port}`));
