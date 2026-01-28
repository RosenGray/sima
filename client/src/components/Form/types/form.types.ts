import { z } from "zod";

export enum FormMode {
  Create = "create",
  Edit = "edit",
  View = "view"
  
}export const FormModeSchema = z.nativeEnum(FormMode);

