import { Router } from "express";
const router = Router();

import {
  createNewsletter,
  deleteNewsletterById,
  getNewsletterById,
  getNewsletters,
  updateNewsletterById,
  diffuseNewsletterById
} from "../controllers/marketingManager/newsletter.controller";

// get newsletters list
router.get("/", getNewsletters);
// create newsletter
router.post("/", createNewsletter);
// get newsletter by id
router.get("/:id", getNewsletterById);
// update newsletter by id
router.post("/:id", updateNewsletterById);
// delete newsletter by id
router.delete("/:id", deleteNewsletterById);
//diffuse newsletter by id
router.post("/diffuse/:id",diffuseNewsletterById );


export default router;
