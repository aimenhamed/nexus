import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../env";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: `postgresql://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:5432/${env.DB_NAME}`,
});

export const db = drizzle(pool, { schema });
