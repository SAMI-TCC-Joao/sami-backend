/*
  Warnings:

  - The primary key for the `SubjectClass` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsersSubjectClasses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_userId_fkey";

-- AlterTable
ALTER TABLE "SubjectClass" DROP CONSTRAINT "SubjectClass_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SubjectClass_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SubjectClass_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "UsersSubjectClasses" DROP CONSTRAINT "UsersSubjectClasses_pkey",
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "subjectClassId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UsersSubjectClasses_pkey" PRIMARY KEY ("userId", "subjectClassId");

-- CreateTable
CREATE TABLE "UserGivenClasses" (
    "userId" TEXT NOT NULL,
    "givenClassId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserGivenClasses_pkey" PRIMARY KEY ("userId","givenClassId")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isTemplate" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "singleAnswer" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "style" JSONB,
    "feedback" TEXT,
    "image" TEXT,
    "order" DOUBLE PRECISION NOT NULL,
    "exhibitionMode" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mandatory" BOOLEAN NOT NULL,
    "formId" TEXT NOT NULL,
    "options" JSONB,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_userId_key" ON "Form"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_formId_key" ON "Question"("formId");

-- AddForeignKey
ALTER TABLE "UserGivenClasses" ADD CONSTRAINT "UserGivenClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGivenClasses" ADD CONSTRAINT "UserGivenClasses_givenClassId_fkey" FOREIGN KEY ("givenClassId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey" FOREIGN KEY ("subjectClassId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
