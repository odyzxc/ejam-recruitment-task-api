import { Router } from "express";

import deployments from "./deployments/deployment.route";

const router = Router();
router.get("/", (req, res) => res.send("OK"));
router.use("/api/deployments", deployments);

export default router;
