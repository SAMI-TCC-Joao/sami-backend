-- DropForeignKey
ALTER TABLE "Evaluations" DROP CONSTRAINT "Evaluations_indicatorId_fkey";

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_indicatorId_fkey" FOREIGN KEY ("indicatorId") REFERENCES "Indicator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_evaluationId_fkey";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "QuestionResponse" DROP CONSTRAINT "QuestionResponse_questionId_fkey";

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
