import { pgTable, text, serial, integer, date, timestamp, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Season type (regular season, playoffs, international)
export type SeasonType = 'regular' | 'playoff' | 'international';

// Season data structure
export interface Season {
  season: string;
  team: string;
  type: SeasonType;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  penaltyMinutes: number;
  timeOnIce: string;
  shotsOnGoal: number;
  shootingPercentage: number;
  faceoffPercentage: number | null;
}

// Career data structure
export interface Career {
  start: string;
  end: string | null;
}

// Player schema for the database
export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  position: text("position").notNull(),
  birthDate: date("birth_date").notNull(),
  birthplace: text("birthplace").notNull(),
  photoUrl: text("photo_url").notNull(),
  jerseyNumber: integer("jersey_number").notNull(),
  inductionYear: date("induction_year").notNull(),
  description: text("description").notNull(),
  gamesPlayed: integer("games_played").notNull(),
  goals: integer("goals").notNull(),
  assists: integer("assists").notNull(),
  points: integer("points").notNull(),
  plusMinus: integer("plus_minus").notNull(),
  penaltyMinutes: integer("penalty_minutes").notNull(),
  timeOnIce: text("time_on_ice").notNull(),
  shotsOnGoal: integer("shots_on_goal").notNull(),
  shootingPercentage: real("shooting_percentage").notNull(),
  faceoffPercentage: real("faceoff_percentage"),
  hits: integer("hits"),
  blocks: integer("blocks"),
  achievements: text("achievements").array().notNull(),
  seasons: text("seasons").notNull(), // JSON string of Season[]
  career: text("career").notNull(), // JSON string of Career
});

// Schemas for input validation
export const insertPlayerSchema = createInsertSchema(players);

// Types based on the schemas
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
