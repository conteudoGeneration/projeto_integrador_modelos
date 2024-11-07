import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Oportunidade } from '../entities/oportunidade.entity';
import { OportunidadeService } from '../services/oportunidade.service';

@UseGuards(JwtAuthGuard)
@Controller('/oportunidades')
@ApiTags('Oportunidade')
@ApiBearerAuth()
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Oportunidade[]> {
    return this.oportunidadeService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Oportunidade> {
    return this.oportunidadeService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Oportunidade[]> {
    return this.oportunidadeService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() oportunidade: Oportunidade): Promise<Oportunidade> {
    return this.oportunidadeService.create(oportunidade);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() oportunidade: Oportunidade): Promise<Oportunidade> {
    return this.oportunidadeService.update(oportunidade);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.delete(id);
  }

  @Put(':id/status/:status')
  @HttpCode(HttpStatus.OK)
  changeStatus(@Param('id') id: number, @Param('status') status: number): Promise<Oportunidade> {
    return this.oportunidadeService.mudarStatus(id, status);
  }
}
