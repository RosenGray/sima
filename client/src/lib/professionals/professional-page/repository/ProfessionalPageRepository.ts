import mongoose from "mongoose";
import { ProfessionalPage } from "../models/ProfessionalPage";
import connectDB from "@/lib/mongo/mongodb";
import { SerializedProfessionalPage } from "../types/professional-page.types";
import { IProfessionalPage } from "../models/ProfessionalPage";

class ProfessionalPageRepository {
  /**
   * Get a professional page by user id (at most one per user)
   */
  async getByUserId(
    userId: string
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
    publicId: string
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

      const professionalPage = await ProfessionalPage.findOne({ slug })
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
   * Create a new professional page
   */
  async create(data: {
    publicId: string;
    slug: string;
    user: string;
    displayName: string;
    description: string;
    profileImage?: IProfessionalPage["profileImage"];
    galleryImages: IProfessionalPage["galleryImages"];
    category?: string;
    subCategory?: string;
    district?: string;
    city?: string;
    contactPhone?: string;
    contactEmail?: string;
    socialLinks?: IProfessionalPage["socialLinks"];
    isPublished: boolean;
  }): Promise<SerializedProfessionalPage> {
    await connectDB();
    const doc = new ProfessionalPage({
      ...data,
      user: new mongoose.Types.ObjectId(data.user),
      category: data.category
        ? new mongoose.Types.ObjectId(data.category)
        : undefined,
      subCategory: data.subCategory
        ? new mongoose.Types.ObjectId(data.subCategory)
        : undefined,
    });
    await doc.save();
    const created = await ProfessionalPage.findById(doc._id)
      .populate("user")
      .populate("category")
      .populate("subCategory");
    return JSON.parse(JSON.stringify(created));
  }

  /**
   * Update an existing professional page by publicId
   */
  async update(
    publicId: string,
    data: Partial<{
      slug: string;
      displayName: string;
      description: string;
      profileImage: IProfessionalPage["profileImage"];
      galleryImages: IProfessionalPage["galleryImages"];
      category: string;
      subCategory: string;
      district: string;
      city: string;
      contactPhone: string;
      contactEmail: string;
      socialLinks: IProfessionalPage["socialLinks"];
      isPublished: boolean;
    }>
  ): Promise<SerializedProfessionalPage | null> {
    await connectDB();
    const updatePayload: Record<string, unknown> = { ...data };
    if (data.category !== undefined) {
      updatePayload.category = new mongoose.Types.ObjectId(data.category);
    }
    if (data.subCategory !== undefined) {
      updatePayload.subCategory = new mongoose.Types.ObjectId(data.subCategory);
    }
    const wantUnsetProfile =
      data.profileImage === null || data.profileImage === undefined;
    if (wantUnsetProfile) {
      delete updatePayload.profileImage;
    }
    const updateOp: Record<string, unknown> = { $set: updatePayload };
    if (wantUnsetProfile) {
      updateOp.$unset = { profileImage: 1 };
    }
    const updated = await ProfessionalPage.findOneAndUpdate(
      { publicId },
      updateOp,
      { new: true }
    )
      .populate("user")
      .populate("category")
      .populate("subCategory");

    if (!updated) return null;
    return JSON.parse(JSON.stringify(updated));
  }
}

export const professionalPageRepository = new ProfessionalPageRepository();
