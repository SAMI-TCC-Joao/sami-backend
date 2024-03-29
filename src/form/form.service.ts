import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { isAllowedOrIsMe } from 'src/lib/authLib';
import { User } from 'src/user/entities/user.entity';
import enums from '../lib/enumLib';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { QuestionService } from 'src/question/question.service';

const { userType } = enums;

@Injectable()
export class FormService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly questionService: QuestionService,
  ) {}

  async create(dto: CreateFormDto, user: User) {
    const data = {
      name: dto.name,
      description: dto.description,
      userId: user.id,
      random: dto.random,
    };

    return await this.prisma.form
      .create({
        data,
      })
      .then(async (form) => {
        if (!dto.questions || dto.questions.length === 0) {
          return form;
        }

        dto.questions.forEach(async (question) => {
          await this.questionService.create(question, form.id);
        });

        return await this.prisma.form
          .findUnique({
            where: {
              id: form.id,
            },
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
          })
          .catch(handleError);
      })
      .catch(handleError);
  }

  async findAll(userLogged: User, withIndicator: string) {
    const where =
      withIndicator === 'true'
        ? {
            user: {
              id: userLogged.id,
            },
          }
        : {
            user: {
              id: userLogged.id,
            },
            indicatorId: null,
          };
    return await this.prisma.form
      .findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          random: true,
          createdAt: true,
          updatedAt: true,
          questions: true,
          userId: true,
          indicatorId: withIndicator === 'true' ? true : false,
        },
      })
      .then((forms) => {
        return forms.sort((a, b) => {
          return a.updatedAt > b.updatedAt ? -1 : 1;
        });
      })
      .catch(handleError);
  }

  async findAllTemplates() {
    return await this.prisma.form
      .findMany({
        where: {
          user: {
            userType: userType.admin.value,
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          random: true,
          createdAt: true,
          updatedAt: true,
          questions: true,
          userId: true,
          indicatorId: false,
        },
      })
      .then((forms) => {
        return forms.sort((a, b) => {
          return a.updatedAt > b.updatedAt ? -1 : 1;
        });
      })
      .catch(handleError);
  }

  async findOne(id: string, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
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
      })
      .catch(handleError);

    if (!form) {
      throw new NotFoundException('Formulário não encontrado');
    }

    const ordered = form.questions.sort((a, b) => a.order - b.order);

    return {
      ...form,
      questions: ordered,
    };
  }

  async update(id: string, dto: UpdateFormDto, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!form) {
      throw new NotFoundException('Formulário não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    const data = {
      name: dto.name,
      description: dto.description,
      random: dto.random,
    };

    return await this.prisma.form
      .update({
        where: {
          id,
        },
        data,
      })
      .then(async (form) => {
        dto.questions.forEach(async (question) => {
          await this.prisma.question.upsert({
            where: {
              id: question.id,
            },
            update: {
              singleAnswer: question.singleAnswer,
              title: question.title,
              style: question.style,
              random: question.random,
              image: question.image,
              order: question.order,
              type: question.type,
              mandatory: question.mandatory,
              form: {
                connect: {
                  id: form.id,
                },
              },
              options: question.options,
            },
            create: {
              singleAnswer: question.singleAnswer,
              title: question.title,
              style: question.style,
              random: question.random,
              image: question.image,
              order: question.order,
              type: question.type,
              mandatory: question.mandatory,
              form: {
                connect: {
                  id: form.id,
                },
              },
              options: question.options,
            },
          });
        });

        return await this.prisma.form.findUnique({
          where: {
            id: form.id,
          },
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
        });
      })
      .catch(handleError);
  }

  async remove(id: string, user: User) {
    const form = await this.prisma.form
      .findUnique({
        where: {
          id,
        },
      })
      .catch(handleError);

    if (!form) {
      throw new NotFoundException('Formulário não encontrado');
    }

    isAllowedOrIsMe(userType.admin.value, user, form.userId);

    return await this.prisma.form
      .delete({
        where: {
          id,
        },
      })
      .catch(handleError);
  }
}
