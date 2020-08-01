import express from "express";
import DeploymentService from "./deployment.service";

const deploymentRoute = express.Router();

const deploymentService = new DeploymentService();

deploymentRoute.get("/", async (req, res) => {
  const all = await deploymentService.getAll();
  res.send(all);
});

export default deploymentRoute;
