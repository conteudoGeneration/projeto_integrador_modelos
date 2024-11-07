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
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Colaborador } from '../entities/colaborador.entity';
import { ColaboradorService } from '../services/colaborador.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CalculoSalario } from '../entities/calculosalario.entity';

@UseGuards(JwtAuthGuard)
@Controller('/colaboradores')
@ApiTags('Colaborador')
@ApiBearerAuth()
export class ColaboradorController {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Colaborador[]> {
    return this.colaboradorService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Colaborador> {
    return this.colaboradorService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Colaborador[]> {
    return this.colaboradorService.findByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() colaborador: Colaborador): Promise<Colaborador> {
    return this.colaboradorService.create(colaborador);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() colaborador: Colaborador): Promise<Colaborador> {
    return this.colaboradorService.update(colaborador);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.colaboradorService.delete(id);
  }

  @Post('/calcularsalario/:id')
  @HttpCode(HttpStatus.OK)
  async calcularSalario(@Param('id', ParseIntPipe) id: number, @Body() dadosSalario: CalculoSalario): Promise<Holerite> {
    return this.colaboradorService.calcularSalario(id, dadosSalario);
  }

}
