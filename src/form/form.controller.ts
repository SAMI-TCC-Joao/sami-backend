import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FormService } from './form.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAllowed, isAllowedOrIsMe } from 'src/lib/authLib';
import enums from '../lib/enumLib';

const { userType } = enums;

@ApiTags('Forms')
@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new form' })
  create(@Body() dto: CreateFormDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.formService.create(dto, userLogged);
  }

  @Get('template')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all template forms' })
  findAllTemplates() {
    return this.formService.findAllTemplates();
  }

  @Get('/')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all forms by user' })
  @ApiQuery({ name: 'withIndicator', required: false, type: Boolean })
  findAll(
    @LoggedUser() userLogged: User,
    @Query('withIndicator') withIndicator: boolean,
  ) {
    isAllowedOrIsMe(userType.admin.value, userLogged, userLogged.id);
    return this.formService.findAll(userLogged, `${withIndicator}`);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a form by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.formService.findOne(id, userLogged);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a form by id' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateFormDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.formService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a form by id' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.formService.remove(id, userLogged);
  }
}
