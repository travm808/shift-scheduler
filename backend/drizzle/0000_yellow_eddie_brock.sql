CREATE TABLE "my_first_table" (
	"my_first_table_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_deleted" boolean DEFAULT false NOT NULL,
	CONSTRAINT "my_first_table_my_first_table_id_unique_constraint" UNIQUE("my_first_table_id")
);
