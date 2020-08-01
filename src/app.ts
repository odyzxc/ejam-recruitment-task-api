import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

export interface IController {
  router: express.Router;
}

class App {
  public app: express.Application;
  public port: number | string;

  constructor(controllers: Array<IController>, port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initializeControllers(controllers: Array<IController>) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening at ${this.port}`);
    });
  }
}

export default App;
