/*
  Warnings:

  - Added the required column `semeter` to the `SubjectClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubjectClass" ADD COLUMN     "semeter" TEXT NOT NULL;
