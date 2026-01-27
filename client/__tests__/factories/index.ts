/**
 * Export all factories for easy importing in tests
 */
export { UserFactory } from "./user.factory";
export { CarFactory } from "./car.factory";
export { ProfessionalServiceFactory } from "./professionalService.factory";
export { JobFactory } from "./job.factory";

// Re-export types for convenience
export type { SerializedUser } from "@/lib/auth/types/auth.scema";
export type { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";
export type { SerializedJob } from "@/lib/jobs/types/job.types";
