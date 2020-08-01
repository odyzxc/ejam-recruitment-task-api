import { Container } from "inversify";
import DeploymentRepository, {
  DeploymentRepositoryType,
  IDeploymentRepository,
} from "../deployments/deployment.repository";
import DeploymentService, {
  IDeploymentService,
  DeploymentServiceType,
} from "../deployments/deployment.service";
import DeploymentsController, {
  IDeploymentsController,
  DeploymentsControllerType,
} from "../deployments/deployment.controller";

const myContainer = new Container();
myContainer
  .bind<IDeploymentRepository>(DeploymentRepositoryType)
  .to(DeploymentRepository);
myContainer
  .bind<IDeploymentService>(DeploymentServiceType)
  .to(DeploymentService);
myContainer
  .bind<IDeploymentsController>(DeploymentsControllerType)
  .to(DeploymentsController);

export { myContainer };
