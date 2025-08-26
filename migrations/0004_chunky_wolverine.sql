CREATE TYPE "public"."session_time_enum" AS ENUM('07:40 - 09:20', '09:30 - 11:10', '11:20 - 13:00', '13:10 - 14:50', '15:00 - 16:40', '16:50 - 18:30', '18:40 - 20:20');--> statement-breakpoint
ALTER TABLE "activity_session" DROP CONSTRAINT "activity_session_activity_id_day_week_start_time_unique";--> statement-breakpoint
ALTER TABLE "activity_session" ADD COLUMN "time" "session_time_enum" NOT NULL;--> statement-breakpoint
ALTER TABLE "activity_session" DROP COLUMN "start_time";--> statement-breakpoint
ALTER TABLE "activity_session" DROP COLUMN "end_time";--> statement-breakpoint
ALTER TABLE "activity_session" ADD CONSTRAINT "activity_session_activity_id_day_week_time_unique" UNIQUE("activity_id","day_week","time");--> statement-breakpoint
DROP TYPE "public"."end_time_enum";--> statement-breakpoint
DROP TYPE "public"."start_time_enum";