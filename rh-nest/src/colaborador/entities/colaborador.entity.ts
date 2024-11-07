import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Departamento } from '../../departamento/entities/departamento.entity';
import { NumericTransformer } from '../../util/numerictransformer';

@Entity({ name: 'tb_colaboradores' })
export class Colaborador {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({ example: 'email@email.com.br' })
  email: string;

  @Column({ length: 5000 })
  @ApiProperty()
  foto: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  cargo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  @ApiProperty()
  salario: number;

  @IsPositive()
  @Column({ type: 'int'})
  @ApiProperty()
  horasMensais: number;

  @IsInt()
  @Min(0)
  @Column({ type: 'int', default: 0})
  @ApiProperty()
  dependentes: number;

  @ManyToOne(() => Departamento, (departamento) => departamento.colaborador, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Departamento })
  departamento?: Departamento;
}
