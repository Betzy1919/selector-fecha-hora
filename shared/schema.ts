import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const alertReports = pgTable("alert_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventDate: timestamp("event_date").notNull(),
  description: text("description"),
});

export const insertAlertReportSchema = createInsertSchema(alertReports).omit({
  id: true,
});

export type InsertAlertReport = z.infer<typeof insertAlertReportSchema>;
export type AlertReport = typeof alertReports.$inferSelect;
