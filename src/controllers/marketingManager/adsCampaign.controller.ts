import { Request, Response } from "express";


// create  a adsCampaign
export const createAdsCampaign = async (req: Request, res: Response) => {
    try {
        // const { error, value } = await adsCampaignValidation.validate(req.body);
        // if (error) {
        // return res.status(400).json({ error: error.details[0].message });
        // }
    
        // const adsCampaign = new AdsCampaign(value);
        // await adsCampaign.save();
        //res.status(201).send(adsCampaign);
    } catch (error) {
        res.status(500).json(error);
    }
    }
//get all adsCampaign

export const getAdsCampaign = async (req: Request, res: Response) => {
    try {
        // const adsCampaign = await AdsCampaign.find();
        // res.status(200).json(adsCampaign);
    } catch (error) {
        res.status(500).json(error);
    }
}

//  get adsCampaign by id

export const getAdsCampaignById = async (req: Request, res: Response) => {
    try {
        // const adsCampaign = await AdsCampaign.findById(req.params.id);
        // res.status(200).json(adsCampaign);
    } catch (error) {
        res.status(500).json(error);
    }
}

// update  adsCampaign
export const updateAdsCampaign = async (req: Request, res: Response) => {
    try {
        // const adsCampaign = await AdsCampaign.findByIdAndUpdate(req.params.id, {
        // $set: req.body,
        // });
        // res.status(200).json(adsCampaign);
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete adsCampaign
export const deleteAdsCampaign = async (req: Request, res: Response) => {
    try {
        // const adsCampaign = await AdsCampaign.findByIdAndDelete(req.params.id);
        // res.status(200).json(adsCampaign);
    } catch (error) {
        res.status(500).json(error);
    }
}

