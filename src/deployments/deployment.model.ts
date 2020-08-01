import { Document, Schema, model } from "mongoose";
import { object, string, date } from "joi";

const semverRegex = /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/;

export const deploymentValidationObject = object({
  url: string().uri().required(),
  templateName: string().required(),
  version: string().regex(semverRegex).required(),
  deployedAt: date().required(),
});

export interface IDeployment extends Document {
  url: string;
  templateName: string;
  version: string;
  deployedAt: Date;
}

export const DeploymentSchema = new Schema({
  url: { type: String, required: true },
  templateName: { type: String, required: true },
  version: { type: String, required: true },
  deployedAt: { type: Date, required: true },
});

const Deployment = model<IDeployment>("Deployment", DeploymentSchema);
export default Deployment;
