import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ObjectValidator } from 'src/question/dto/questions-json.decorator';

export class CreateResponseDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Evaluation Id',
    example: 'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o6f',
  })
  evaluationId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Class Id',
    example: 'f1e2d3c4-b5a6-7c8d-9e0f-1a3b3c4d5o6f',
  })
  classId: string;

  @IsNotEmpty()
  @ObjectValidator()
  @ApiProperty({
    description: 'Answers Response',
    example: {
      data: [
        {
          questionId: 'f1e2d3c4-b5a6-7c8d-9e0f-5a2b3c4d5o6f',
          type: 'text',
          answer: 'Answer 1',
        },
        {
          questionId: 'f1e2d3c4-b5a6-7c8d-9e0f-6a2b3c4d5o6f',
          type: 'alternative',
          answer: 'f1e2d3c4-b5a6-7c8d-9e2f-1a2b3c4d5o6f',
        },
        {
          questionId: 'f1e2d3c4-b5a6-7c8d-9e0f-7a2b3c4d5o6f',
          type: 'multipleChoice',
          answer: [
            'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o2f',
            'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o3f',
            'f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o1f',
          ],
        },
        {
          questionId: 'f1e2d3c4-b5a6-7c8d-9e0f-2a2b3c4d5o6f',
          type: 'likert',
          answer: [
            {
              lineId: 'f7e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o6f',
              columnId: 'f2e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5o6f',
            },
          ],
        },
      ],
    },
  })
  answers: any;
}
