/*
  Warnings:

  - Added the required column `shouldRepeat` to the `Evaluations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evaluations" ADD COLUMN     "shouldRepeat" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "SubjectClass" ALTER COLUMN "subjectId" SET DATA TYPE TEXT;
