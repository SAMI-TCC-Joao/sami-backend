-- CreateTable
CREATE TABLE "SubjectClass" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "SubjectClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registration" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSubjectClasses" (
    "userId" INTEGER NOT NULL,
    "subjectClassId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UsersSubjectClasses_pkey" PRIMARY KEY ("userId","subjectClassId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_registration_key" ON "User"("registration");

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSubjectClasses" ADD CONSTRAINT "UsersSubjectClasses_subjectClassId_fkey" FOREIGN KEY ("subjectClassId") REFERENCES "SubjectClass"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
