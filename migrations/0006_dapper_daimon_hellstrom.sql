ALTER TABLE "activity_session" RENAME TO "activity_schedule";--> statement-breakpoint
ALTER TABLE "activity_schedule" DROP CONSTRAINT "activity_session_activity_id_day_week_time_unique";--> statement-breakpoint
ALTER TABLE "activity_enrollment" DROP CONSTRAINT "activity_enrollment_session_id_activity_session_session_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_schedule" DROP CONSTRAINT "activity_session_activity_id_extracurricular_activity_activity_id_fk";
--> statement-breakpoint
ALTER TABLE "activity_enrollment" ADD CONSTRAINT "activity_enrollment_session_id_activity_schedule_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."activity_schedule"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_schedule" ADD CONSTRAINT "activity_schedule_activity_id_extracurricular_activity_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."extracurricular_activity"("activity_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_schedule" ADD CONSTRAINT "activity_schedule_activity_id_day_week_time_unique" UNIQUE("activity_id","day_week","time");