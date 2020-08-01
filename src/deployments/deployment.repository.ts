import Deployment, { IDeployment } from "./deployment.model";
import { injectable } from "inversify";

export const DeploymentRepositoryType = Symbol.for("DeploymentRepository");
export interface IDeploymentRepository {
  get(deploymentId: string): Promise<IDeployment | null>;
  getAll(): Promise<Array<IDeployment>>;
  create(deployment: IDeployment): Promise<IDeployment>;
  delete(deploymentId: string): void;
}

@injectable()
export default class DeploymentRepository implements IDeploymentRepository {
  async get(deploymentId: string): Promise<IDeployment | null> {
    return await Deployment.findById(deploymentId);
  }

  async getAll(): Promise<Array<IDeployment>> {
    return await Deployment.find();
  }

  async create(deployment: IDeployment): Promise<IDeployment> {
    const deploymentDoc = new Deployment(deployment);
    return await deploymentDoc.save();
  }

  async delete(deploymentId: string) {
    return await Deployment.findByIdAndRemove(deploymentId);
  }
}
