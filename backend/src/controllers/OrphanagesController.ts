import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanages from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = await orphanagesRepository.findOneOrFail(id);

    return response.json(orphanages);
  },

  async create(request: Request, response: Response) {
    console.log(request.body);
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return {
        path: image.filename
      }
    })

    const orphanagesRepository = getRepository(Orphanages);

    const orphanages = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    await orphanagesRepository.save(orphanages);

    return response.status(201).json(orphanages);
  }
}
