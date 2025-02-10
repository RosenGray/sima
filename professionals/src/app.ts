import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@sima-board/common";
import serviceCategoriesRouter from "./routes/service-categories";
import serviceSubCategoriesRouter from "./routes/service-sub-categories";
import { ServiceCategory } from "./models/ServiceCategory";
import { ServiceSubCategory } from "./models/ServiceSubCategory";

export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.get("/api/professionals/healthcheck", async (req, res) => {
  // const house = new ServiceCategory({
  //   name: "ConstructionRepair",
  //   description: "ConstructionRepairDescription",
  // });
  // await house.save();

  // const category = await ServiceCategory.findOne({ key: "ConstructionRepair" });

  // if (!category) {
  //  throw new Error("Category not found");
  // }

  // const newSubCategory = new ServiceSubCategory({
  //  key: "web-development",
  //  displayName: "Web Development",
  //  description: "Web development services",
  //  russianDisplayName: "Веб-разработка",
  //  russianDescription: "Услуги веб-разработки",
  //  serviceCategory: category._id,
  //  serviceCategoryKey: category.key
  // });

  // await newSubCategory.save();

  res.status(200).send({ health: true });
});

app.use(currentUser);
app.use("/api/professionals/service-categories", serviceCategoriesRouter);
app.use(
  "/api/professionals/service-sub-categories",
  serviceSubCategoriesRouter
);
app.get("*", async (req, res) => {
  throw new NotFoundError(`Route ${req.method} ${req.url} not found`);
});
app.use(errorHandler);

[];
