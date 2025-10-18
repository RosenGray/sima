import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { SerilizeProfessionalService } from "../types/professional-service.scema";

class ProfessionalServiceRepository {
  /**
   * Get all professional services
   * @returns Promise<IProfessionalService[]> - Array of professional services
   */
  async getAll(): Promise<SerilizeProfessionalService[]> {
    try {
      await connectDB();

      const professionalServices = await ProfessionalService.find({})
        .populate("category")
        .populate("subCategory")
        .populate("user")
        .sort({ createdAt: -1 }); // Sort by newest first

      //dummy await for 5 sec
      // await new Promise((resolve) => setTimeout(resolve, 5000));

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedServices = JSON.parse(
        JSON.stringify(professionalServices)
      );

      return serializedServices;
    } catch (error) {
      console.error("Error fetching professional services:", error);
      throw new Error("Failed to fetch professional services");
    }
  }

  /**
   * Get a professional service by publicId
   * @param publicId - The public ID of the professional service
   * @returns Promise<SerilizeProfessionalService | null> - The professional service or null if not found
   */
  async getByPublicId(
    publicId: string
  ): Promise<SerilizeProfessionalService | null> {
    try {
      await connectDB();

      const professionalService = await ProfessionalService.findOne({
        publicId,
      })
        .populate("category")
        .populate("subCategory")
        .populate("user");

      if (!professionalService) {
        return null;
      }

      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedService = JSON.parse(JSON.stringify(professionalService));

      return serializedService;
    } catch (error) {
      console.error("Error fetching professional service:", error);
      throw new Error("Failed to fetch professional service");
    }
  }
}

export const professionalServiceRepository =
  new ProfessionalServiceRepository();
