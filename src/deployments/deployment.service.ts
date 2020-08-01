import Deployment from "./deployment.model";

export default class DeploymentService {
  async getAll() {
    return await Deployment.find();
  }
}
