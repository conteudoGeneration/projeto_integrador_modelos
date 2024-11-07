import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { NumericTransformer } from '../../util/numerictransformer';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';

@Entity({ name: 'tb_viagens' })
export class Viagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  partida: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  destino: string;

  @ApiProperty()
  @IsDateString()
  @Column({ type: 'datetime', nullable: false })
  dataPartida: Date;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new NumericTransformer(),
  })
  valor: number;

  @IsPositive()
  @Column({ type: 'float', default: 1 })
  distancia: number;

  @IsPositive()
  @Column({ type: 'float', default: 1 })
  velocidadeMedia: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @IsOptional()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  tempoEstimado: string;

  @ManyToOne(() => Veiculo, (veiculo) => veiculo.viagem, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Veiculo })
  veiculo: Veiculo;
  
  @ManyToOne(() => Usuario, (usuario) => usuario.viagem, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ type: () => Usuario })
  usuario: Usuario;
  
}
