/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateClasseDto } from './dto/create-classe.dto';
import { UpdateClasseDto } from './dto/update-classe.dto';
import { User } from 'src/user/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';

@Injectable()
export class ClasseService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateClasseDto, userLogged: User) {
    const data = {
      name: dto.name,
      semester: dto.semester,
      subjectId: dto.subjectId,
      subjectName: dto.subjectName,
      teacherId: userLogged.id,
    };

    return this.prisma.subjectClass
      .create({
        data,
      })
      .then((classe) => {
        return classe;
      })
      .catch(handleError);
  }

  findAll(userLogged: User) {
    return this.prisma.subjectClass
      .findMany({
        where: {
          teacher: {
            id: userLogged.id,
          },
        },
        select: {
          id: true,
          name: true,
          semester: true,
          subjectId: true,
          subjectName: true,
          teacher: true,
          teacherId: true,
          UsersSubjectClasses: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  registration: true,
                },
              },
              assignedAt: true,
              assignedBy: true,
            },
          },
        },
      })
      .then((classes) => classes)
      .catch(handleError);
  }

  async findIndicatorClass(id: string) {
    // retornar todas as classes dentro de todos os evaluations dentro do indicator

    return this.prisma.subjectClass
      .findMany({
        where: {
          evaluations: {
            some: {
              indicatorId: id,
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      })
      .then(async (classes) => {
        const users = await this.prisma.user.findMany({
          where: {
            QuestionResponse: {
              some: {
                class: {
                  id: {
                    in: classes.map((classe) => classe.id),
                  },
                },
              },
            },
          },
          select: {
            id: true,
            name: true,
            takenclasses: {
              select: {
                subjectClass: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

        return {
          classes,
          users,
        };
      })
      .catch(handleError);
  }

  findOne(id: string) {
    return this.prisma.subjectClass
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          semester: true,
          subjectId: true,
          subjectName: true,
          teacher: true,
          teacherId: true,
          UsersSubjectClasses: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  registration: true,
                },
              },
              assignedAt: true,
              assignedBy: true,
            },
          },
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }

  update(id: string, dto: UpdateClasseDto) {
    return this.prisma.subjectClass
      .update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          semester: dto.semester,
          subjectId: dto.subjectId,
          subjectName: dto.subjectName,
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }

  delete(id: string) {
    return this.prisma.subjectClass
      .delete({
        where: {
          id,
        },
        include: {
          UsersSubjectClasses: true,
        },
      })
      .then((classe) => classe)
      .catch(handleError);
  }
}
