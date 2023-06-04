import { InferModel } from "drizzle-orm";
import { teams } from "../modules/db/schema";

export type NewTeam = InferModel<typeof teams, "insert">;
