import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import enums from '../lib/enumLib';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const { userType } = enums;

@Injectable()
export class EvaluationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEvaluationDto) {
    const data = {
      form: {
        connect: {
          id: dto.formId,
        },
      },
      indicator: {
        connect: {
          id: dto.indicatorId,
        },
      },
      class: {
        connect: {
          id: dto.classId,
        },
      },
      initialDate: dto.initialDate,
      finalDate: dto.finalDate,
      repeat: dto.repeat,
    };

    return await this.prisma.evaluations
      .create({
        data,
      })
      .catch(handleError);
  }

  async findAll(userLogged: User) {
    const evaluations = await this.prisma.evaluations.findMany({
      where: {
        indicator: {
          user: {
            id: userLogged.id,
          },
        },
      },
      select: {
        id: true,
        classId: true,
        form: {
          select: {
            id: true,
            name: true,
          },
        },
        initialDate: true,
        finalDate: true,
        repeat: true,
        createdAt: true,
      },
    });

    if (!evaluations) {
      throw new NotFoundException('Nenhuma aplicação encontrada');
    }

    return evaluations;
  }

  async findAllStudent(userLogged: User) {
    const evaluations = await this.prisma.evaluations.findMany({
      where: {
        class: {
          UsersSubjectClasses: {
            some: {
              user: {
                id: userLogged.id,
              },
            },
          },
        },
      },
      select: {
        id: true,
        classId: true,
        form: {
          select: {
            id: true,
            name: true,
          },
        },
        initialDate: true,
        finalDate: true,
        repeat: true,
        createdAt: true,
      },
    });

    const responses = await this.prisma.response.findMany({
      where: {
        user: {
          id: userLogged.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        evaluationId: true,
        createdAt: true,
      },
    });

    const evaluationsFiltered = evaluations.filter((evaluation) => {
      const response = responses.find(
        (response) => response.evaluationId === evaluation.id,
      );

      if (
        response &&
        dayjs(response?.createdAt).format('DD/MM/YYYY') ===
          dayjs().format('DD/MM/YYYY')
      ) {
        return false;
      }

      return true;
    });

    console.log(evaluationsFiltered);

    if (!evaluationsFiltered) {
      throw new NotFoundException('Nenhuma aplicação encontrada');
    }

    return evaluationsFiltered;
  }

  async findOne(id: string, user: User, withForm = false) {
    const evaluation = await this.prisma.evaluations
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          class: {
            select: {
              id: true,
              name: true,
            },
          },
          ...(withForm
            ? {
                form: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                    random: true,
                    createdAt: true,
                    updatedAt: true,
                    questions: true,
                    userId: true,
                  },
                },
              }
            : {}),
          initialDate: true,
          finalDate: true,
          repeat: true,
          indicator: {
            select: {
              userId: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!evaluation) {
      throw new NotFoundException('Aplicação não encontrada');
    }

    return evaluation;
  }

  async update(id: string, dto: UpdateEvaluationDto, user: User) {
    const evaluation = await this.prisma.evaluations
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          classId: true,
          formId: true,
          initialDate: true,
          finalDate: true,
          repeat: true,
          indicator: {
            select: {
              userId: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!evaluation) {
      throw new NotFoundException('Aplicação não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, evaluation.indicator.userId);

    const data = {
      form: {
        connect: {
          id: dto.formId,
        },
      },
      indicator: {
        connect: {
          id: dto.indicatorId,
        },
      },
      class: {
        connect: {
          id: dto.classId,
        },
      },
      initialDate: dto.initialDate,
      finalDate: dto.finalDate,
      repeat: dto.repeat,
    };

    return this.prisma.evaluations
      .update({
        where: {
          id,
        },
        data,
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const evaluation = await this.prisma.evaluations
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          classId: true,
          formId: true,
          initialDate: true,
          finalDate: true,
          repeat: true,
          indicator: {
            select: {
              userId: true,
            },
          },
        },
      })
      .catch(handleError);

    if (!evaluation) {
      throw new NotFoundException('Aplicação não encontrada');
    }

    isAllowedOrIsMe(userType.admin.value, user, evaluation.indicator.userId);

    return this.prisma.evaluations
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
