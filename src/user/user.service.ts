/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import tokenLib from 'src/lib/tokenLib';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/errorHandlers/customErrorList';
import { cryptUrl, decryptUrl, validateData } from 'src/utils/helper';
import { CreatePasswordDto } from './dto/create-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import crypto from 'crypto-js';
import { JwtPayload } from './entities/jwtChangePassword.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Prisma } from '@prisma/client';
import {
  ChangeEmail,
  ChangePasswordEmail,
  FirstAcessEmail,
  RegisterNewUserEmail,
  SendEmailForgotPassword,
} from 'src/utils/emailsTemplates.utils';
import { isAllowedOrIsMeEmail } from 'src/lib/authLib';
import enums from '../lib/enumLib';

const { userType } = enums;

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto, userLogged: User) {
    const verifyUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { registration: dto.registration }] },
    });

    if (verifyUser) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    return this.prisma.user
      .create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await tokenLib.generatePasswordHash(dto.registration),
          registration: dto.registration,
          userType: dto.userType,
        },
      })
      .then(async ({ password, ...createUser }) => {
        const token = this.jwtService.sign(
          {
            id: createUser.id,
            email: createUser.email,
            name: createUser.name,
            registration: createUser.registration,
          },
          {
            expiresIn: '2h',
          },
        );

        const tokenCrypt = crypto.AES.encrypt(
          token,
          process.env.JWT_NEW_USER_SECRET,
        ).toString();

        const tokenUrl = await cryptUrl(tokenCrypt);

        await this.prisma.user.update({
          where: { email: createUser.email },
          data: { tokenChange: tokenCrypt },
        });

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          secure: true,
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailData = {
          from: `TCC <${process.env.USER_EMAIL}>`,
          to: createUser.email,
          subject: 'Cadastro de usuário',
          text: `Olá ${createUser.name}, seu cadastro foi realizado com sucesso pelo usuário ${userLogged.name}. Sua senha é ${createUser.registration}
                  aproveite e valide a sua senha aqui: {AREA EM DESENVOLVIMENTO} localhost/user/first-access/${tokenUrl}.`, // aqui vai a url do front que aponta para a rota firstAccess, se o user n respeitar isso e tentar fazer login, o front vai redirecionar para a mesma pagina de cadastro de senha
          html: RegisterNewUserEmail(createUser.name, tokenUrl),
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException('Error sending email');
          } else {
            console.log(info);
          }
        });

        return createUser;
      })
      .catch(handleError);
  }

  async findAll() {
    return this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          email: true,
          registration: true,
          takenclasses: {
            select: {
              id: true,
              subjectClass: {
                select: {
                  id: true,
                  name: true,
                  semester: true,
                  subjectName: true,
                  teacher: {
                    select: {
                      name: true,
                      email: true,
                      registration: true,
                    },
                  },
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((user) => user)
      .catch(handleError);
  }

  async findLogged(user: User) {
    const userLogged = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        registration: true,
        userType: true,
        takenclasses: {
          select: {
            id: true,
            subjectClass: {
              select: {
                id: true,
                name: true,
                semester: true,
                subjectName: true,
                teacher: {
                  select: {
                    name: true,
                    email: true,
                    registration: true,
                  },
                },
              },
            },
          },
        },
        token: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userLogged) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { password: userPassword, ...userData } = await validateData(
      userLogged,
    );

    return userData;
  }

  async findTeacher() {
    return this.prisma.user
      .findMany({
        where: { userType: 'teacher' },
        select: {
          id: true,
          name: true,
          email: true,
          registration: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .then((user) => {
        return user;
      })
      .catch(handleError);
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        registration: true,
        userType: true,
        takenclasses: {
          select: {
            id: true,
            subjectClass: {
              select: {
                id: true,
                name: true,
                semester: true,
                subjectName: true,
                teacher: {
                  select: {
                    name: true,
                    email: true,
                    registration: true,
                  },
                },
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async firstAccess(tokenCrypt: string, dto: CreatePasswordDto) {
    try {
      if (!tokenCrypt) {
        throw new BadRequestException('token é obrigatório');
      }

      const tokenDecryptUrl = await decryptUrl(tokenCrypt);

      const tokenDecrypt = crypto.AES.decrypt(
        tokenDecryptUrl,
        process.env.JWT_NEW_USER_SECRET,
      ).toString(crypto.enc.Utf8);

      let jwtVerify: JwtPayload;
      try {
        jwtVerify = this.jwtService.verify(tokenDecrypt);
      } catch (error) {
        throw new UnauthorizedException('Token inválido');
      }

      const verifyUser = await this.prisma.user.findUnique({
        where: { email: jwtVerify.email },
      });

      if (!verifyUser) {
        throw new BadRequestException('Usuário não encontrado');
      }

      if (
        !verifyUser.tokenChange ||
        verifyUser.tokenChange !== tokenDecryptUrl
      ) {
        throw new UnauthorizedException('Token inválido');
      }

      if (!verifyUser.newUser) {
        throw new BadRequestException('Usuário já cadastrou senha');
      }

      const verifyPassword = await bcrypt.compare(
        dto.password,
        verifyUser.password,
      );
      if (!verifyPassword) {
        throw new BadRequestException('Senha incorreta');
      }

      const data = {
        password: await tokenLib.generatePasswordHash(dto.newPassword),
        newUser: false,
        tokenChange: null,
      };

      const userUpdate = await this.prisma.user.update({
        where: { email: verifyUser.email },
        data,
      });

      const { password: userPassword, ...user } = await validateData(
        userUpdate,
      );

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: 'gmail',
        secure: true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      const mailData = {
        from: `TCC <${process.env.USER_EMAIL}>`,
        to: user.email,
        subject: 'Alteração de senha - primeiro acesso',
        text: `Olá ${user.name}. Sua senha já foi alterada, agora já pode fazer login na aplicação!`,
        html: FirstAcessEmail(user.name),
      };

      transporter.sendMail(mailData, function (err, info) {
        if (err) {
          console.log(err);

          throw new BadRequestException('Error sending email');
        } else {
          console.log(info);
        }
      });

      return user;
    } catch (error) {
      return handleError(error);
    }
  }

  async sendEmailForgotPassword(email: string): Promise<string> {
    const user = await this.prisma.user
      .findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          registration: true,
          newUser: true,
        },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`Email '${email}' não encontrado`);
    }

    if (user.newUser) {
      throw new NotFoundException(`Usuário '${email}' não cadastrou senha`);
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      registration: user.registration,
    };

    const token = this.jwtService.sign(payload);

    const tokenCrypt = crypto.AES.encrypt(
      token,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString();

    const tokenToUrl = await cryptUrl(tokenCrypt);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const mailData = {
      from: `TCC <${process.env.USER_EMAIL}>`,
      to: user.email,
      subject: 'Alteração de senha',
      text: `altere a senha aqui: {AREA EM DESENVOLVIMENTO} http://localhost:3000/changePassword/${tokenToUrl}`,
      html: SendEmailForgotPassword(tokenToUrl),
    };

    transporter.sendMail(mailData, async function (err, info) {
      if (err) {
        console.log(err);

        throw new BadRequestException('Error sending email');
      } else {
        console.log(info);
      }
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { tokenChange: tokenCrypt },
    });

    return 'Email enviado com sucesso, verifique sua caixa de entrada!';
  }

  async changePassword(
    tokenCrypt: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    if (!tokenCrypt) {
      throw new BadRequestException('token é obrigatório');
    }

    const tokenDecryptUrl = await decryptUrl(tokenCrypt);

    const tokenDecrypt = crypto.AES.decrypt(
      tokenDecryptUrl,
      process.env.JWT_CHANGE_PASSWORD_SECRET,
    ).toString(crypto.enc.Utf8);

    let jwtVerify: JwtPayload;
    try {
      jwtVerify = this.jwtService.verify(tokenDecrypt);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    const verifyUser = await this.prisma.user.findUnique({
      where: { email: jwtVerify.email },
    });

    if (!verifyUser) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (!verifyUser.tokenChange || verifyUser.tokenChange !== tokenDecryptUrl) {
      throw new UnauthorizedException('Token inválido');
    }

    if (verifyUser.newUser) {
      throw new BadRequestException('Usuário não cadastrou senha');
    }

    if (!dto.password || !dto.confirmPassword) {
      throw new BadRequestException('Informe a nova senha.');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    const hashedPassword = await tokenLib.generatePasswordHash(dto.password);

    const data: Prisma.UserUpdateInput = {
      password: hashedPassword,
      tokenChange: null,
    };

    return this.prisma.user
      .update({
        where: { email: verifyUser.email },
        data,
      })
      .then((user) => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          service: 'gmail',
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailData = {
          from: `TCC <${process.env.USER_EMAIL}>`,
          to: user.email,
          subject: 'Senha alterada',
          text: `Olá ${user.name}. Sua senha já foi alterada, agora já pode fazer login na aplicação!`,
          html: ChangePasswordEmail(),
        };

        transporter.sendMail(mailData, function (err, info) {
          if (err) {
            console.log(err);

            throw new BadRequestException('Error sending email');
          } else {
            console.log(info);
          }
        });
        return { message: 'Senha alterada com sucesso, faça login!' };
      })
      .catch(handleError);
  }

  async update(email: string, dto: UpdateUserDto) {
    if (!email) {
      throw new BadRequestException('Id é obrigatório');
    }

    try {
      const userVerify = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!userVerify) {
        throw new BadRequestException('Usuário não encontrado');
      }

      if (!dto.email || dto.email === userVerify.email) {
        const data = await this.prisma.user.update({
          where: { email },
          data: dto,
        });
        const { password: userPassword, ...user } = await validateData(data);
        return user;
      }

      const data = {
        email: dto.email,
        userType: dto.userType || userVerify.userType,
        name: dto.name || userVerify.name,
        registration: dto.registration || userVerify.registration,
        password: dto.registration
          ? await tokenLib.generatePasswordHash(dto.registration)
          : userVerify.password,
        newUser: true,
      };

      return this.prisma.user
        .update({
          where: { email },
          data,
        })
        .then(async ({ password, ...updatedUser }) => {
          const token = this.jwtService.sign(
            {
              id: updatedUser.id,
              email: updatedUser.email,
              name: updatedUser.name,
              registration: updatedUser.registration,
            },
            {
              expiresIn: '2h',
            },
          );

          const tokenCrypt = crypto.AES.encrypt(
            token,
            process.env.JWT_NEW_USER_SECRET,
          ).toString();

          const tokenUrl = await cryptUrl(tokenCrypt);

          await this.prisma.user.update({
            where: { email: updatedUser.email },
            data: { tokenChange: tokenCrypt },
          });

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            service: 'gmail',
            secure: true,
            auth: {
              user: process.env.USER_EMAIL,
              pass: process.env.USER_PASSWORD,
            },
          });

          const mailData = {
            from: `TCC <${process.env.USER_EMAIL}>`,
            to: updatedUser.email,
            subject: 'Alteração de email',
            text: `Olá ${updatedUser.name}, seu cadastro foi atualizado, como o email foi alterado, sua senha foi resetada também. Sua senha é ${updatedUser.registration}
                      aproveite e valide a sua senha aqui: {AREA EM DESENVOLVIMENTO} localhost/user/first-access/${tokenUrl}.`, // aqui vai a url do front que aponta para a rota firstAccess, se o user n respeitar isso e tentar fazer login, o front vai redirecionar para a mesma pagina de cadastro de senha
            html: ChangeEmail(
              updatedUser.name,
              updatedUser.email,
              updatedUser.registration,
              tokenUrl,
            ),
          };

          transporter.sendMail(mailData, function (err, info) {
            if (err) {
              console.log(err);

              throw new BadRequestException('Error sending email');
            } else {
              console.log(info);
            }
          });

          return updatedUser;
        })
        .catch(handleError);
    } catch (error) {
      return handleError(error);
    }
  }

  async updateId(id: string, dto: UpdateUserDto, user: User) {
    const userVerify = await this.prisma.user.findUnique({
      where: { id },
    });
    isAllowedOrIsMeEmail(userType.admin.value, user, userVerify.email);

    if (!userVerify) {
      throw new BadRequestException('Usuário não encontrado');
    }

    this.update(userVerify.email, dto);
  }

  async remove(id: string, user: User) {
    if (!id) {
      throw new BadRequestException('Id é obrigatório');
    }

    if (user.userType !== 'admin' && user.userType !== 'teacher') {
      throw new BadRequestException('Usuário sem permissão');
    }

    try {
      const data = await this.prisma.user.delete({
        where: { id },
      });
      await validateData(data);
      const { password: userPassword, ...user } = await validateData(data);
      return user;
    } catch (error) {
      return handleError(error);
    }
  }
}
