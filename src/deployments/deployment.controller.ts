import express from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import {
  IDeploymentService,
  DeploymentServiceType,
} from "./deployment.service";
import { IDeployment } from "./deployment.model";
import ValidationError from "../core/errors/ValidationError";
import { IController } from "../app";

export const DeploymentsControllerType = Symbol.for("DeploymentsController");
export interface IDeploymentsController extends IController {}

@injectable()
class DeploymentsController implements IDeploymentsController {
  public path = "/api/deployments";
  public router = express.Router();

  @inject(DeploymentServiceType)
  private _deploymentService!: IDeploymentService;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getDeployments.bind(this));
    this.router.post(this.path, this.createDeployment.bind(this));
    this.router.delete(
      `${this.path}/:deploymentId`,
      this.deleteDeployment.bind(this)
    );
  }

  async getDeployments(req: express.Request, res: express.Response) {
    const all = await this._deploymentService.getAll();
    return res.send(all);
  }

  async createDeployment(req: express.Request, res: express.Response) {
    try {
      const deployment = req.body as IDeployment;
      deployment.deployedAt = new Date();
      const deploymentSaved = await this._deploymentService.create(deployment);
      return res.status(201).send(deploymentSaved);
    } catch (error) {
      if (error instanceof ValidationError) {
        const { message, details } = error;
        return res.status(400).send({ message, details });
      }
      return res.status(500).send(error);
    }
  }
  async deleteDeployment(req: express.Request, res: express.Response) {
    const { deploymentId } = req.params;
    const deployment = await this._deploymentService.get(deploymentId);
    if (!deployment) {
      return res.sendStatus(404);
    }
    await this._deploymentService.delete(deploymentId);
    return res.sendStatus(204);
  }
}

export default DeploymentsController;
