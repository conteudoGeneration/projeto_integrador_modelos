import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ClienteService } from '../../cliente/services/cliente.service';
import { Oportunidade } from '../entities/oportunidade.entity';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(Oportunidade)
    private oportunidadeRepository: Repository<Oportunidade>,
    private clienteService: ClienteService,
  ) {}

  async findAll(): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      relations: {
        cliente: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Oportunidade> {
    let buscaOportunidade = await this.oportunidadeRepository.findOne({
      where: {
        id,
      },
      relations: {
        cliente: true,
        usuario: true,
      },
    });

    if (!buscaOportunidade)
      throw new HttpException(
        'A Oportunidade não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );

    return buscaOportunidade;
  }

  async findByNome(nome: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        cliente: true,
        usuario: true,
      },
    });
  }

  async create(oportunidade: Oportunidade): Promise<Oportunidade> {
    if (!oportunidade.cliente)
      throw new HttpException(
        'Os dados do Cliente não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.clienteService.findById(oportunidade.cliente.id);

    return await this.oportunidadeRepository.save(oportunidade);
  }

  async update(oportunidade: Oportunidade): Promise<Oportunidade> {
    
    if (!oportunidade.id)
      throw new HttpException(
        'A Oportunidade não foi encontrada!',
        HttpStatus.NOT_FOUND,
      );

    await this.findById(oportunidade.id);

    if (!oportunidade.cliente)
      throw new HttpException(
        'Os dados do Cliente não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.clienteService.findById(oportunidade.cliente.id);

    return await this.oportunidadeRepository.save(oportunidade);

  }

  async delete(id: number): Promise<DeleteResult> {
    
    await this.findById(id);

    return await this.oportunidadeRepository.delete(id);

  }

  async mudarStatus(id: number, status: number): Promise<Oportunidade> {
    
    const novoStatus = Number(status);

    if (novoStatus < 1 || novoStatus > 3) {
      throw new HttpException(
        'O Status deve ser um valor entre 1 e 3',
        HttpStatus.BAD_REQUEST,
      );
    }

    let buscaOportunidade = await this.findById(id);

    return await this.oportunidadeRepository.save({
      ...buscaOportunidade,
      status: novoStatus,
    });
  }
}
