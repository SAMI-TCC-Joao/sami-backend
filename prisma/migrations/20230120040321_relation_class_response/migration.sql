/*
  Warnings:

  - Added the required column `classId` to the `QuestionResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuestionResponse" ADD COLUMN     "classId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_classId_fkey" FOREIGN KEY ("classId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
