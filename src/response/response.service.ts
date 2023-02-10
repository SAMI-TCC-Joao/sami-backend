import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateResponseDto } from './dto/create-response.dto';
import enums from '../lib/enumLib';
import { isAllowedOrIsMe } from 'src/lib/authLib';

const { userType } = enums;

@Injectable()
export class ResponseService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateResponseDto, user: User) {
    for (const questionResponse of dto.answers) {
      await this.prisma.response
        .create({
          data: {
            evaluation: {
              connect: {
                id: dto.evaluationId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
            QuestionResponse: {
              create: {
                answer: questionResponse.options,
                userId: user.id,
                questionId: questionResponse.id,
                classId: dto.classId,
              },
            },
          },
        })
        .catch(handleError);
    }

    await this.prisma.evaluations.update({
      where: {
        id: dto.evaluationId,
      },
      data: {
        responses: {
          increment: 1,
        },
      },
    });

    return 'Aplicação criada com sucesso';
  }

  async findAll(userLogged: User) {
    const evaluations = await this.prisma.response.findMany({
      where: {
        user: {
          id: userLogged.id,
        },
      },
    });

    if (!evaluations) {
      throw new NotFoundException('Nenhuma aplicação encontrada');
    }

    return evaluations;
  }

  async findOne(id: string, user: User) {
    const evaluation = await this.prisma.response.findUnique({
      where: {
        id,
      },
    });

    if (!evaluation) {
      throw new NotFoundException('Aplicação não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, evaluation.userId);

    return evaluation;
  }
}
