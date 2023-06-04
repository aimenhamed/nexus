import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["default", "admin"]);

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  manager: varchar("manager", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamServiceRelations = relations(teams, ({ many }) => ({
  services: many(services),
}));

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  owner: uuid("owner"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const serviceTeamRelations = relations(services, ({ one }) => ({
  owner: one(teams, { fields: [services.owner], references: [teams.id] }),
}));

export const assets = pgTable("assets", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  owner: uuid("owner").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
