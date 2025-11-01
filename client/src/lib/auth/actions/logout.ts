"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SIMA_AUTH_SESSION_CONFIG } from "../config";
import { revalidatePath } from "next/cache";

export async function logoutUser() {
  const cookieStore = await cookies();

  cookieStore.set(SIMA_AUTH_SESSION_CONFIG.name, "", {
    domain: SIMA_AUTH_SESSION_CONFIG.domain,
    path: "/",
  });
  cookieStore.delete(SIMA_AUTH_SESSION_CONFIG.name);
  revalidatePath("/", "layout");
  redirect("/");
}
