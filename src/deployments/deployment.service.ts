import { ObjectId } from "mongodb";
import { inject, injectable } from "inversify";

import { IDeployment, deploymentValidationObject } from "./deployment.model";
import {
  IDeploymentRepository,
  DeploymentRepositoryType,
} from "./deployment.repository";
import ValidationError from "../core/errors/ValidationError";

export const DeploymentServiceType = Symbol.for("DeploymentService");
export interface IDeploymentService {
  get(deploymentId: string): Promise<IDeployment | null>;
  getAll(): Promise<Array<IDeployment>>;
  create(deployment: IDeployment): Promise<IDeployment>;
  delete(deploymentId: string): void;
}

@injectable()
export default class DeploymentService {
  private _deploymentRepository: IDeploymentRepository;
  constructor(
    @inject(DeploymentRepositoryType)
    deploymentRepository: IDeploymentRepository
  ) {
    this._deploymentRepository = deploymentRepository;
  }

  async get(deploymentId: string) {
    if (!ObjectId.isValid(deploymentId)) {
      return null;
    }
    return await this._deploymentRepository.get(deploymentId);
  }

  async getAll() {
    return await this._deploymentRepository.getAll();
  }

  async create(deployment: IDeployment) {
    const validationResult = deploymentValidationObject.validate(deployment, {
      abortEarly: false,
    });
    if (validationResult.error) {
      throw new ValidationError(
        "Could not validate deployment. Check the details for more information.",
        validationResult.error.details
      );
    }
    return await this._deploymentRepository.create(deployment);
  }

  async delete(deploymentId: string) {
    return await this._deploymentRepository.delete(deploymentId);
  }
}
