ALTER TABLE "student" DROP CONSTRAINT "student_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "teacher" DROP CONSTRAINT "teacher_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;