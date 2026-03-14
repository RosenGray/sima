import { MetadataRoute } from "next";
import { getVehicleManufacturers } from "@/lib/vehicles/cars/vehicleManufacturers";
import { getMotorcycleManufacturers } from "@/lib/vehicles/motorcycles/motorcycleManufacturers";
import { getOffRoadVehicleManufacturers } from "@/lib/vehicles/off-road/offRoadVehicleManufacturers";
import { getCommercialVehicleManufacturers } from "@/lib/vehicles/commercial-vehicles/vehicleCommercialManufacturers";
import { getScooterManufacturers } from "@/lib/vehicles/scooters/scooterManufacturers";
import { getSpecialVehicleCategories } from "@/lib/vehicles/special-vehicles/specialVehicleCategories";
import { getAccessoryCategories } from "@/lib/vehicles/accessories/accessoryCategories";
import { israelLocations } from "@/lib/cities";
import { Districts } from "@/lib/cities/types/cities.schema";

const BASE_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL ?? "https://www.sima-board.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // ── Static section index pages ──────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Vehicles
    { url: `${BASE_URL}/vehicles/cars`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${BASE_URL}/vehicles/motorcycles`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/vehicles/off-road`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/vehicles/scooters`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/vehicles/commercial-vehicles`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/vehicles/special-vehicles`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/vehicles/accessories`, lastModified: now, changeFrequency: "daily", priority: 0.6 },

    // Pets
    { url: `${BASE_URL}/pets/for-sale`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/pets/for-free`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/pets/accessories`, lastModified: now, changeFrequency: "daily", priority: 0.6 },

    // Real estate
    { url: `${BASE_URL}/real-estate/for-sale`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/real-estate/for-rent`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/real-estate/commercial-real-estate`, lastModified: now, changeFrequency: "daily", priority: 0.7 },

    // Other sections
    { url: `${BASE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/professional-service`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/other`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/yad2`, lastModified: now, changeFrequency: "daily", priority: 0.6 },

    // Info
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/sitemap-html`, lastModified: now, changeFrequency: "weekly", priority: 0.3 },
  ];

  // ── Cars: manufacturer + manufacturer×model pages ────────────────────────
  const carManufacturers = getVehicleManufacturers();
  const carPages: MetadataRoute.Sitemap = carManufacturers.flatMap((mfr) => [
    {
      url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...mfr.models.map((model) => ({
      url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}&amp;model=${model.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
  ]);

  // ── Motorcycles ──────────────────────────────────────────────────────────
  const motorcycleManufacturers = getMotorcycleManufacturers();
  const motorcyclePages: MetadataRoute.Sitemap =
    motorcycleManufacturers.flatMap((mfr) => [
      {
        url: `${BASE_URL}/vehicles/motorcycles?manufacturer=${mfr.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      ...mfr.models.map((model) => ({
        url: `${BASE_URL}/vehicles/motorcycles?manufacturer=${mfr.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.5,
      })),
    ]);

  // ── Off-road ─────────────────────────────────────────────────────────────
  const offRoadManufacturers = getOffRoadVehicleManufacturers();
  const offRoadPages: MetadataRoute.Sitemap = offRoadManufacturers.flatMap(
    (mfr) => [
      {
        url: `${BASE_URL}/vehicles/off-road?manufacturer=${mfr.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      ...mfr.models.map((model) => ({
        url: `${BASE_URL}/vehicles/off-road?manufacturer=${mfr.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.5,
      })),
    ]
  );

  // ── Commercial vehicles ──────────────────────────────────────────────────
  const commercialManufacturers = getCommercialVehicleManufacturers();
  const commercialPages: MetadataRoute.Sitemap =
    commercialManufacturers.flatMap((mfr) => [
      {
        url: `${BASE_URL}/vehicles/commercial-vehicles?manufacturer=${mfr.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      },
      ...mfr.models.map((model) => ({
        url: `${BASE_URL}/vehicles/commercial-vehicles?manufacturer=${mfr.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.5,
      })),
    ]);

  // ── Scooters ─────────────────────────────────────────────────────────────
  const scooterManufacturers = getScooterManufacturers();
  const scooterPages: MetadataRoute.Sitemap = scooterManufacturers.flatMap(
    (mfr) => [
      {
        url: `${BASE_URL}/vehicles/scooters?manufacturer=${mfr.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      },
      ...mfr.models.map((model) => ({
        url: `${BASE_URL}/vehicles/scooters?manufacturer=${mfr.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.4,
      })),
    ]
  );

  // ── Special vehicles: category × model pages ─────────────────────────────
  const specialVehicleCategories = getSpecialVehicleCategories();
  const specialVehiclePages: MetadataRoute.Sitemap =
    specialVehicleCategories.flatMap((cat) => [
      {
        url: `${BASE_URL}/vehicles/special-vehicles?category=${cat.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      },
      ...cat.models.map((model) => ({
        url: `${BASE_URL}/vehicles/special-vehicles?category=${cat.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ]);

  // ── Vehicle accessories: category × sub-category pages ───────────────────
  const accessoryCategories = getAccessoryCategories();
  const accessoryPages: MetadataRoute.Sitemap = accessoryCategories.flatMap(
    (cat) => [
      {
        url: `${BASE_URL}/vehicles/accessories?category=${cat.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.5,
      },
      ...cat.models.map((model) => ({
        url: `${BASE_URL}/vehicles/accessories?category=${cat.id}&amp;model=${model.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.4,
      })),
    ]
  );

  // ── District filter pages for the highest-value sections ─────────────────
  const districts = Object.values(israelLocations).filter(
    (d) => d.id !== Districts.All
  );
  const districtPages: MetadataRoute.Sitemap = districts.flatMap((district) => [
    {
      url: `${BASE_URL}/vehicles/cars?district=${district.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/real-estate/for-sale?district=${district.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/real-estate/for-rent?district=${district.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/pets/for-sale?district=${district.id}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.5,
    },
  ]);

  return [
    ...staticPages,
    ...carPages,
    ...motorcyclePages,
    ...offRoadPages,
    ...commercialPages,
    ...scooterPages,
    ...specialVehiclePages,
    ...accessoryPages,
    ...districtPages,
  ];
}
