import express from "express";
import DeploymentService from "./deployment.service";
import DeploymentRepository from "./deployment.repository";
import { IDeployment } from "./deployment.model";
import ValidationError from "../core/errors/ValidationError";

const deploymentRoute = express.Router();

// TODO DI container?
const deploymentRepository = new DeploymentRepository();
const deploymentService = new DeploymentService(deploymentRepository);

deploymentRoute.get("/", async (req, res) => {
  const all = await deploymentService.getAll();
  return res.send(all);
});

deploymentRoute.post("/", async (req, res) => {
  try {
    const deploymentSaved = await deploymentService.create(
      req.body as IDeployment
    );
    return res.status(201).send(deploymentSaved);
  } catch (error) {
    if (error instanceof ValidationError) {
      const { message, details } = error;
      return res.status(400).send({ message, details });
    }
    return res.status(500).send(error);
  }
});

deploymentRoute.delete("/:deploymentId", async (req, res) => {
  const { deploymentId } = req.params;
  const deployment = await deploymentService.get(deploymentId);
  if (!deployment) {
    return res.sendStatus(404);
  }
  await deploymentService.delete(deploymentId);
  return res.sendStatus(204);
});

export default deploymentRoute;
