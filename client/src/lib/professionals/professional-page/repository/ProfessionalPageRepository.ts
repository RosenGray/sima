import mongoose from "mongoose";
import { ProfessionalPage } from "../models/ProfessionalPage";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedProfessionalPage } from "../types/professional-page.types";

class ProfessionalPageRepository {
  /**
   * Get a professional page by user id (at most one per user)
   */
  async getByUserId(
    userId: string,
  ): Promise<SerializedProfessionalPage | null> {
    try {
      await connectDB();
      const page = await ProfessionalPage.findOne({
        user: new mongoose.Types.ObjectId(userId),
      })
        .populate("user")
        .populate("category")
        .populate("subCategory");

      if (!page) return null;
      return JSON.parse(JSON.stringify(page));
    } catch (error) {
      console.error("Error fetching professional page by user:", error);
      throw new Error("Failed to fetch professional page");
    }
  }

  /**
   * Get a professional page by publicId
   * @param publicId - The public ID of the professional page
   * @returns Promise<SerializedProfessionalPage | null>
   */
  async getByPublicId(
    publicId: string,
  ): Promise<SerializedProfessionalPage | null> {
    try {
      await connectDB();

      const professionalPage = await ProfessionalPage.findOne({ publicId })
        .populate("user")
        .populate("category")
        .populate("subCategory");

      if (!professionalPage) {
        return null;
      }

      const serialized = JSON.parse(JSON.stringify(professionalPage));
      return serialized;
    } catch (error) {
      console.error("Error fetching professional page:", error);
      throw new Error("Failed to fetch professional page");
    }
  }

  /**
   * Get a professional page by slug
   * @param slug - The URL slug of the professional page
   * @returns Promise<SerializedProfessionalPage | null>
   */
  async getBySlug(slug: string): Promise<SerializedProfessionalPage | null> {
    try {
      await connectDB();

      const professionalPage = await ProfessionalPage.findOne({
        fullSlug: slug,
      })
        .populate("user")
        .populate("category")
        .populate("subCategory");

      if (!professionalPage) {
        return null;
      }

      const serialized = JSON.parse(JSON.stringify(professionalPage));
      return serialized;
    } catch (error) {
      console.error("Error fetching professional page:", error);
      throw new Error("Failed to fetch professional page");
    }
  }
}

export const professionalPageRepository = new ProfessionalPageRepository();
