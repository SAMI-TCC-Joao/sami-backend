import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import enums from '../lib/enumLib';
import { isAllowed, isAllowedOrIsMeEmail } from 'src/lib/authLib';

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

  @Get('all/:email')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find all responses by email' })
  findAll(@LoggedUser() userLogged: User, @Param('email') email: string) {
    isAllowedOrIsMeEmail(userType.admin.value, userLogged, email);
    return this.responseService.findAll(email);
  }

  @Get('one/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find one response by id' })
  findOne(@Param('id') id: string, @LoggedUser() userLogged: User) {
    return this.responseService.findOne(id, userLogged);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateResponseDto) {
    return this.responseService.update(+id, dto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responseService.remove(+id);
  } */
}
