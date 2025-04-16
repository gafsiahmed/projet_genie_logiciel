import { Router } from "express";

import { sendAnnonceMail } from "../../controllers/instructor/annonces.controller";

const router = Router();

router.post("/", sendAnnonceMail);

export default router;
