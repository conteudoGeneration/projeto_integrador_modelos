import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Exercicio } from '../entities/exercicio.entity';

@Injectable()
export class ExercicioService {
  constructor(
    @InjectRepository(Exercicio)
    private exercicioRepository: Repository<Exercicio>,
    @Inject(forwardRef(() => CategoriaService)) private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Exercicio> {
    let exercicio = await this.exercicioRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!exercicio)
      throw new HttpException(
        'O Exercicio não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    return exercicio;
  }

  async findByNome(nome: string): Promise<Exercicio[]> {
    return await this.exercicioRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(exercicio: Exercicio): Promise<Exercicio> {
    if (!exercicio.categoria)
      throw new HttpException(
        'Os dados da Categoria não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.categoriaService.findById(exercicio.categoria.id);

    return await this.exercicioRepository.save(exercicio);
  }

  async update(exercicio: Exercicio): Promise<Exercicio> {
    if (!exercicio.id)
      throw new HttpException(
        'O Exercicio não foi encontrado!',
        HttpStatus.NOT_FOUND,
      );

    await this.findById(exercicio.id);

    if (!exercicio.categoria)
      throw new HttpException(
        'Os dados da Categoria não foram informados!',
        HttpStatus.BAD_REQUEST,
      );

    await this.categoriaService.findById(exercicio.categoria.id);

    return await this.exercicioRepository.save(exercicio);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.exercicioRepository.delete(id);
  }

}
