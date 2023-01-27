import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMe } from 'src/lib/authLib';

const { userType } = enums;

@ApiTags('Responses')
@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new response' })
  create(@Body() dto: CreateResponseDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.student.value], userLogged);
    return this.responseService.create(dto, userLogged);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all responses by user' })
  findAll(@LoggedUser() userLogged: User) {
    isAllowedOrIsMe(userType.admin.value, userLogged, userLogged.id);
    return this.responseService.findAll(userLogged);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find one response by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.responseService.findOne(id, userLogged);
  }
}
