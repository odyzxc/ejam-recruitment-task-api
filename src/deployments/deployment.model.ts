import { Document, Schema, model } from "mongoose";

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
