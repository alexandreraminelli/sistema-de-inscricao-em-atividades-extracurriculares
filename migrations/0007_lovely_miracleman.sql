ALTER TABLE "activity_schedule" ALTER COLUMN "day_week" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."day_week_enum";--> statement-breakpoint
CREATE TYPE "public"."day_week_enum" AS ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado');--> statement-breakpoint
ALTER TABLE "activity_schedule" ALTER COLUMN "day_week" SET DATA TYPE "public"."day_week_enum" USING "day_week"::"public"."day_week_enum";