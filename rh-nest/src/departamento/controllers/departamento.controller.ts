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
import { Departamento } from '../entities/departamento.entity';
import { DepartamentoService } from '../services/departamento.service';

@UseGuards(JwtAuthGuard)
@Controller('/departamentos')
@ApiTags('Departamento')
@ApiBearerAuth()
export class DepartamentoController {
  constructor(private readonly departamentoService: DepartamentoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Departamento[]> {
    return this.departamentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Departamento> {
    return this.departamentoService.findById(id);
  }

  @Get('/descricao/:descricao')
  @HttpCode(HttpStatus.OK)
  findByDescricao(@Param('descricao') descricao: string): Promise<Departamento[]> {
    return this.departamentoService.findByDescricao(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() departamento: Departamento): Promise<Departamento> {
    return this.departamentoService.create(departamento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() departamento: Departamento): Promise<Departamento> {
    return this.departamentoService.update(departamento);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.departamentoService.delete(id);
  }

}
