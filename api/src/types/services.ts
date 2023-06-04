import { InferModel } from "drizzle-orm";
import { services } from "../modules/db/schema";

export type NewService = InferModel<typeof services, "insert">;
