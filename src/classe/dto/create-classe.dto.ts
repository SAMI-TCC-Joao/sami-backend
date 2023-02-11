import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClasseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Classe name',
    example: 'Turma 1',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Discipline name',
    example: 'Math',
  })
  subjectName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Discipline code',
    example: '543642',
  })
  subjectId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Semester data',
    example: '06-2021',
  })
  semester: string;
}
