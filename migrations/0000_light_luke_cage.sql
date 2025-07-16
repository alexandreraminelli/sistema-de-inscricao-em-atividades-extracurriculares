CREATE TYPE "public"."day_week_enum" AS ENUM('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado');--> statement-breakpoint
CREATE TYPE "public"."end_time_enum" AS ENUM('09:20', '11:10', '13:00', '14:50', '16:40', '18:30', '20:20');--> statement-breakpoint
CREATE TYPE "public"."start_time_enum" AS ENUM('07:40', '09:30', '11:20', '13:10', '15:00', '16:50', '18:40');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('student', 'teacher');--> statement-breakpoint
CREATE TABLE "extracurricular_activity" (
	"activity_id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"category_id" uuid NOT NULL,
	"description" text DEFAULT 'Sem descrição' NOT NULL,
	"teacher_id" uuid NOT NULL,
	"cover_img" varchar(500),
	CONSTRAINT "extracurricular_activity_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"category_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "category_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "activity_enrollment" (
	"enrollment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"session_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "activity_session" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activity_id" uuid NOT NULL,
	"day_week" "day_week_enum" NOT NULL,
	"start_time" "start_time_enum" NOT NULL,
	"end_time" "end_time_enum" NOT NULL,
	CONSTRAINT "activity_session_activity_id_day_week_start_time_unique" UNIQUE("activity_id","day_week","start_time")
);
--> statement-breakpoint
CREATE TABLE "student" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"enrollment_number" char(10)
);
--> statement-breakpoint
CREATE TABLE "teacher" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"description" text DEFAULT 'Sem descrição' NOT NULL,
	"is_admin" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" char(60) NOT NULL,
	"role" "role_enum" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "extracurricular_activity" ADD CONSTRAINT "extracurricular_activity_category_id_category_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "extracurricular_activity" ADD CONSTRAINT "extracurricular_activity_teacher_id_teacher_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teacher"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_enrollment" ADD CONSTRAINT "activity_enrollment_student_id_users_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_enrollment" ADD CONSTRAINT "activity_enrollment_session_id_activity_session_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."activity_session"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activity_session" ADD CONSTRAINT "activity_session_activity_id_extracurricular_activity_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."extracurricular_activity"("activity_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;