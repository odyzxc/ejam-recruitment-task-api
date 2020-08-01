import { connect } from "mongoose";
import app from "./app";

// TODO move password to env variables
const uri =
  "mongodb+srv://testUser:testPassword@cluster0.42q8l.gcp.mongodb.net/ejam-recruitment-task?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

connect(uri, options)
  .then(() => {
    const port: string | number = process.env.PORT || 5000;

    app.listen(port, () => console.log(`App listening at ${port}`));
  })
  .catch((error) => {
    console.log(`Intializing server failed: ${error}`);
  });
