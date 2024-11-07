import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Departamento } from '../entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll(): Promise<Departamento[]> {
    return await this.departamentoRepository.find({
      relations: {
        colaborador: true,
      },
    });
  }

  async findById(id: number): Promise<Departamento> {
    let buscaDepartamento = await this.departamentoRepository.findOne({
      where: {
        id,
      },
      relations: {
        colaborador: true,
      },
    });

    if (!buscaDepartamento)
      throw new HttpException(
        'O Departamento não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return buscaDepartamento;
  }

  async findByDescricao(descricao: string): Promise<Departamento[]> {
    return await this.departamentoRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        colaborador: true,
      },
    });
  }

  async create(departamento: Departamento): Promise<Departamento> {

    return await this.departamentoRepository.save(departamento);
  }

  async update(departamento: Departamento): Promise<Departamento> {
    
    if (!departamento.id)
      throw new HttpException(
        'O Departamento não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return await this.departamentoRepository.save(departamento);

  }

  async delete(id: number): Promise<DeleteResult> {
    
    await this.findById(id);

    return await this.departamentoRepository.delete(id);

  }

}
