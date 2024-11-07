import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { DepartamentoService } from '../../departamento/services/departamento.service';
import { Colaborador } from '../entities/colaborador.entity';
import {
  calcularINSS,
  calcularIRRF,
  ResultadoINSS,
  ResultadoIRRF,
} from '../helpers/imposto.helper';
import { CalculoSalario } from '../entities/calculosalario.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador)
    private colaboradorRepository: Repository<Colaborador>,
    private departamentoService: DepartamentoService,
  ) {}

  async findAll(): Promise<Colaborador[]> {
    return await this.colaboradorRepository.find({
      relations: {
        departamento: true,
      },
    });
  }

  async findById(id: number): Promise<Colaborador> {
    let colaborador = await this.colaboradorRepository.findOne({
      where: {
        id,
      },
      relations: {
        departamento: true,
      },
    });

    if (!colaborador)
      throw new HttpException(
        'Colaborador não encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return colaborador;
  }

  async findByNome(nome: string): Promise<Colaborador[]> {
    return await this.colaboradorRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        departamento: true,
      },
    });
  }

  async create(colaborador: Colaborador): Promise<Colaborador> {
    if (!colaborador.departamento)
      throw new HttpException(
        'Os dados do Departamento não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.departamentoService.findById(colaborador.departamento.id);

    return await this.colaboradorRepository.save(colaborador);
  }

  async update(colaborador: Colaborador): Promise<Colaborador> {
    if (!colaborador.id)
      throw new HttpException(
        'Os dados do Colaborador não foram informados!',
        HttpStatus.NOT_FOUND,
      );

    await this.findById(colaborador.id);

    if (!colaborador.departamento)
      throw new HttpException(
        'Os dados da Categoria não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.departamentoService.findById(colaborador.departamento.id);

    return await this.colaboradorRepository.save(colaborador);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.colaboradorRepository.delete(id);
  }

  async calcularSalario(
    id: number,
    dadosSalario: CalculoSalario,
  ): Promise<Holerite> {
    // Busca do usuário e cálculo de salário por hora
    const usuario = await this.findById(id);

    // Valor da hora regular do colaborador
    const salarioPorHora = usuario.salario / usuario.horasMensais;

    // Valor da hora extra do colaborador (hora regular + 50%)
    // ( 1 = 100% e 0.5 = 50%)
    const valorHoraExtra = 1.5 * salarioPorHora;

    // Cálculo de horas extras
    const valorTotalHorasExtras = dadosSalario.totalHorasExtras * valorHoraExtra;

    // Cálculo de descontos (INSS)
    const inss: ResultadoINSS = calcularINSS(usuario.salario);

    // Cálculo de descontos (IRRF)
    const irrf: ResultadoIRRF = calcularIRRF(
      usuario.salario,
      usuario.dependentes,
    );

    // Total de Descontos
    const totalDescontos =
      inss.desconto + irrf.desconto + dadosSalario.descontos;

    // Cálculo do salário líquido
    const salarioLiquido =
      (usuario.salario + valorTotalHorasExtras) - totalDescontos;
      
    // Retorno do objeto Holerite com os detalhes necessários
    return {
      salario: usuario.salario,
      horasExtras: dadosSalario.totalHorasExtras,
      valorHoraExtra,
      valorTotalHorasExtras,
      inss: inss.desconto,
      irrf: irrf.desconto,
      totalDescontos,
      salarioLiquido,
    };
    
  }
}
