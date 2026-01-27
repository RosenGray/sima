import { faker } from "@faker-js/faker";
import { Car } from "@/lib/vehicles/cars/models/Car";
import { SerializedCar, ICar } from "@/lib/vehicles/cars/types/cars.types";
import { TransmissionType, EngineType } from "@/lib/vehicles/cars/types/cars.types";
import { FileUploadItem } from "@/lib/files/uploadFiles";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { getVehicleManufacturers } from "@/lib/vehicles/cars/vehicleManufacturers";
import { getVehicleModelsToSelectOptionsByManufacturerIds } from "@/lib/vehicles/cars/vehicleModels";

// Common districts in Israel
const DISTRICTS = [
  "Центр",
  "Север",
  "Юг",
  "Иерусалим",
  "Хайфа",
  "Тель-Авив",
];

// Common cities
const CITIES = [
  "Тель-Авив",
  "Иерусалим",
  "Хайфа",
  "Беэр-Шева",
  "Нетания",
  "Ашдод",
  "Ришон-ле-Цион",
  "Петах-Тиква",
  "Беэр-Яаков",
];

// Common car colors
const COLORS = [
  "Белый",
  "Черный",
  "Серебристый",
  "Серый",
  "Красный",
  "Синий",
  "Зеленый",
  "Бежевый",
];

interface CarFactoryOptions {
  user?: SerializedUser | mongoose.Types.ObjectId;
  manufacturer?: string;
  model?: string;
  yearOfManufacture?: number;
  price?: number;
  images?: FileUploadItem[];
}

/**
 * Create a mock image
 */
function createMockImage(index: number = 0): FileUploadItem {
  return {
    id: nanoid(10),
    originalName: `car-image-${index + 1}.jpg`,
    uniqueName: `${nanoid(20)}-car-image-${index + 1}.jpg`,
    url: `https://example.com/vehicles/cars/test-user/car-image-${index + 1}.jpg`,
    fieldname: "files",
    versionId: nanoid(10),
    folderName: "vehicles/cars",
  };
}

/**
 * Build a Car object without saving to database
 */
export function buildCar(
  overrides?: Partial<ICar> & CarFactoryOptions
): Omit<SerializedCar, "user"> & { user: SerializedUser | mongoose.Types.ObjectId } {
  const manufacturers = getVehicleManufacturers();
  const randomManufacturer = faker.helpers.arrayElement(manufacturers);
  const models = getVehicleModelsToSelectOptionsByManufacturerIds([randomManufacturer.id]);
  const randomModel = faker.helpers.arrayElement(models);

  const yearOfManufacture =
    overrides?.yearOfManufacture ??
    faker.number.int({ min: 2000, max: new Date().getFullYear() });

  const imageCount = faker.number.int({ min: 1, max: 5 });
  const images =
    overrides?.images ??
    Array.from({ length: imageCount }, (_, i) => createMockImage(i));

  return {
    id: overrides?.id ?? new mongoose.Types.ObjectId().toString(),
    publicId: overrides?.publicId ?? nanoid(10),
    user:
      overrides?.user ??
      (overrides?.user instanceof mongoose.Types.ObjectId
        ? overrides.user
        : new mongoose.Types.ObjectId()),
    manufacturer: overrides?.manufacturer ?? randomManufacturer.name,
    model: overrides?.model ?? randomModel.label,
    yearOfManufacture,
    numberOfHand: overrides?.numberOfHand ?? faker.number.int({ min: 1, max: 5 }),
    transmission:
      overrides?.transmission ??
      faker.helpers.arrayElement(Object.values(TransmissionType)),
    engineType:
      overrides?.engineType ?? faker.helpers.arrayElement(Object.values(EngineType)),
    engineCapacity:
      overrides?.engineCapacity ??
      faker.helpers.arrayElement([1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.4, 3.0]),
    mileage:
      overrides?.mileage ??
      faker.number.int({ min: 0, max: 300000 }),
    numberOfDoors:
      overrides?.numberOfDoors ?? faker.helpers.arrayElement([2, 4, 5]),
    color: overrides?.color ?? faker.helpers.arrayElement(COLORS),
    price:
      overrides?.price ??
      faker.number.int({ min: 20000, max: 500000 }),
    description:
      overrides?.description ??
      faker.lorem.paragraphs(2, "\n"),
    accessories:
      overrides?.accessories ?? faker.lorem.sentence(),
    district: overrides?.district ?? faker.helpers.arrayElement(DISTRICTS),
    city: overrides?.city ?? faker.helpers.arrayElement(CITIES),
    contactName:
      overrides?.contactName ??
      `${faker.person.firstName()} ${faker.person.lastName()}`,
    contactPrimaryPhone:
      overrides?.contactPrimaryPhone ??
      faker.phone.number("05#-###-####"),
    contactSecondaryPhone:
      overrides?.contactSecondaryPhone ??
      (faker.datatype.boolean() ? faker.phone.number("05#-###-####") : undefined),
    contactEmail: overrides?.contactEmail ?? faker.internet.email(),
    acceptTerms: overrides?.acceptTerms ?? true,
    images,
    createdAt: overrides?.createdAt ?? new Date(),
    updatedAt: overrides?.updatedAt ?? new Date(),
  };
}

/**
 * Create a Car in the database
 */
export async function createCar(
  overrides?: Partial<ICar> & CarFactoryOptions
): Promise<SerializedCar> {
  const carData = buildCar(overrides);
  const userObjectId =
    carData.user instanceof mongoose.Types.ObjectId
      ? carData.user
      : new mongoose.Types.ObjectId(carData.user.id);

  const car = new Car({
    ...carData,
    user: userObjectId,
  });
  await car.populate("user");
  await car.save();

  return JSON.parse(JSON.stringify(car)) as SerializedCar;
}

/**
 * Create multiple Cars in the database
 * Supports creating 200-500 items efficiently
 */
export async function createManyCars(
  count: number,
  overrides?: Partial<ICar> & CarFactoryOptions
): Promise<SerializedCar[]> {
  const cars: SerializedCar[] = [];
  
  // Create in batches to avoid memory issues
  const batchSize = 50;
  for (let i = 0; i < count; i += batchSize) {
    const batchCount = Math.min(batchSize, count - i);
    const batch = await Promise.all(
      Array.from({ length: batchCount }, () => createCar(overrides))
    );
    cars.push(...batch);
  }
  
  return cars;
}

/**
 * Build multiple Car objects without saving to database
 */
export function buildManyCars(
  count: number,
  overrides?: Partial<ICar> & CarFactoryOptions
): Array<Omit<SerializedCar, "user"> & { user: SerializedUser | mongoose.Types.ObjectId }> {
  return Array.from({ length: count }, () => buildCar(overrides));
}

export const CarFactory = {
  build: buildCar,
  buildMany: buildManyCars,
  create: createCar,
  createMany: createManyCars,
};
