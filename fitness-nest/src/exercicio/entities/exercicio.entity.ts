import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, Min } from 'class-validator';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_exercicios' })
export class Exercicio {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0})
  @ApiProperty()
  tempo: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0})
  @ApiProperty()
  serie: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0})
  @ApiProperty()
  repeticao: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0 })
  @ApiProperty()
  peso: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0})
  @ApiProperty()
  descanso: number;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.exercicio, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Categoria })
  categoria: Categoria;

}
