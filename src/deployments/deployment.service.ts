import { IDeployment, deploymentValidationObject } from "./deployment.model";
import { IDeploymentRepository } from "./deployment.repository";
import ValidationError from "../core/errors/ValidationError";
import { ObjectId } from "mongodb";

export default class DeploymentService {
  private _deploymentRepository: IDeploymentRepository;
  constructor(deploymentRepository: IDeploymentRepository) {
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
