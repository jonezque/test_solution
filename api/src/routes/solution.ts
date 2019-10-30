import express, { Request, Response } from 'express';
import { getRepository, In } from 'typeorm';

import { Symptom } from '../entity/symptom';
import { Tag } from '../entity/tag';

const router = express.Router();
/* GET users listing. */
router.get('/', async (req: Request, res: Response) => {
    const text = req.query.text.split(' ');
    const tags = await getRepository(Tag).find({ where: { data: In(text) }, relations: ['symptoms'] });
    const symptoms = tags.reduce((acc: Symptom[], x) => [...acc, ...x.symptoms], []);
    res.send(symptoms);
});

router.get('/:id', async (req: Request, res: Response) => {
    const symptom = await getRepository(Symptom).findOne(req.params.id, { relations: ['solutions'] });
    console.log(symptom);
    res.send(symptom && symptom.solutions);
});

export default router;
