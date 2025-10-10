import {
  ProfessionalService,
  IProfessionalService,
} from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";

class ProfessionalServiceRepository {
  /**
   * Get all professional services
   * @returns Promise<IProfessionalService[]> - Array of professional services
   */
  async getAll(): Promise<IProfessionalService[]> {
    try {
      await connectDB();

      const professionalServices = await ProfessionalService.find({})
        .populate("category")
        .populate("subCategory")
        .populate("userId")
        .sort({ createdAt: -1 }) // Sort by newest first

      //dummy await for 5 sec
      // await new Promise((resolve) => setTimeout(resolve, 5000));
  
      // Serialize to remove MongoDB ObjectIds and other non-serializable types
      const serializedServices = JSON.parse(JSON.stringify(professionalServices));
      
      return serializedServices;
    } catch (error) {
      console.error("Error fetching professional services:", error);
      throw new Error("Failed to fetch professional services");
    }
  }
}

export const professionalServiceRepository =
  new ProfessionalServiceRepository();
