import express, { Request, Response } from "express";

import { InternalServerError } from "@sima-board/common";

import { IServiceCategory, ServiceCategory } from "../models/ServiceCategory";
import {
  IServiceSubCategory,
  ServiceSubCategory,
} from "../models/ServiceSubCategory";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const serviceCategories = await ServiceCategory.find({});
  res.send(serviceCategories);
});

router.get("/mapping", async (req: Request, res: Response) => {
  console.log("mapping was requested2");
  try {
    const serviceCategories = await ServiceCategory.find({});

    const mapping: Record<
      IServiceCategory["id"],
      {
        category: IServiceCategory;
        subCategories: IServiceSubCategory[];
      }
    > = {};

    await Promise.all(
      serviceCategories.map(async (category) => {
        const subCategories = await ServiceSubCategory.find({
          serviceCategoryKey: category.key,
        });

        mapping[category.id] = {
          category: {
            id: category.id,
            key: category.key,
            displayName: category.displayName,
            description: category.description,
            russianDisplayName: category.russianDisplayName,
            russianDescription: category.russianDescription,
          },
          subCategories: subCategories.map((sub) => ({
            id: sub.id,
            key: sub.key,
            displayName: sub.displayName,
            description: sub.description,
            russianDisplayName: sub.russianDisplayName,
            russianDescription: sub.russianDescription,
            serviceCategory: category.id,
            serviceCategoryKey: category.key,
          })),
        };
      })
    );

    res.status(200).json(mapping);
  } catch (error) {
    throw new InternalServerError();
  }
});

export default router;
