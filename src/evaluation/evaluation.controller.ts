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
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAllowed, isAllowedOrIsMe } from 'src/lib/authLib';
import enums from '../lib/enumLib';

const { userType } = enums;

@ApiTags('Evaluations')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a evaluation' })
  create(@Body() dto: CreateEvaluationDto, @LoggedUser() userLogged: User) {
    isAllowed([userType.admin.value, userType.teacher.value], userLogged);
    return this.evaluationService.create(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all evaluations by user' })
  findAll(@LoggedUser() userLogged: User) {
    isAllowedOrIsMe(userType.admin.value, userLogged, userLogged.id);
    return this.evaluationService.findAll(userLogged);
  }

  @Get('student')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all evaluations to respond by user' })
  findAllStudent(@LoggedUser() userLogged: User) {
    isAllowedOrIsMe(userType.admin.value, userLogged, userLogged.id);
    return this.evaluationService.findAllStudent(userLogged);
  }

  @Get('one/:id/')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a evaluation by id' })
  @ApiQuery({ name: 'withForm', required: false, type: Boolean })
  findOne(
    @Param('id') id: string,
    @LoggedUser() userLogged: User,
    @Query('withForm') withForm: boolean,
  ) {
    return this.evaluationService.findOne(id, userLogged, withForm);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a evaluation' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEvaluationDto,
    @LoggedUser() userLogged: User,
  ) {
    return this.evaluationService.update(id, dto, userLogged);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a evaluation' })
  remove(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.evaluationService.remove(id, userLogged);
  }
}
