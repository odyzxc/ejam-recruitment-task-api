import { connect } from "mongoose";
import "reflect-metadata";
import App from "./app";
import { myContainer } from "./config/inversify.config";
import {
  DeploymentsControllerType,
  IDeploymentsController,
} from "./deployments/deployment.controller";

// TODO move password to env variables
const uri =
  "mongodb+srv://testUser:testPassword@cluster0.42q8l.gcp.mongodb.net/ejam-recruitment-task?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const deploymentsController = myContainer.get<IDeploymentsController>(
  DeploymentsControllerType
);

connect(uri, options)
  .then(() => {
    const port: string | number = process.env.PORT || 5000;
    const application = new App([deploymentsController], port);
    application.listen();
  })
  .catch((error) => {
    console.log(`Intializing server failed: ${error}`);
  });
