/*
  Warnings:

  - You are about to drop the column `day` on the `Lesson` table. All the data in the column will be lost.
  - Made the column `email` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "day";

-- AlterTable
ALTER TABLE "Teacher" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
