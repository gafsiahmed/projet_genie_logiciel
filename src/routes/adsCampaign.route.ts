import express from "express";

import {
    createAdsCampaign,
    deleteAdsCampaign,
    getAdsCampaign,
    getAdsCampaignById,
    updateAdsCampaign
} from "../../src/controllers/marketingManager/adsCampaign.controller";



const router = express.Router();


router.get('/', getAdsCampaign);
router.get('/:id', getAdsCampaignById);
router.post('/', createAdsCampaign);
router.put('/:id', updateAdsCampaign);
router.delete('/:id', deleteAdsCampaign);




export default router;