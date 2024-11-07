import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercicio } from '../../exercicio/entities/exercicio.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 5000, nullable: false })
  icone: string;

  @ApiProperty()
  @OneToMany(() => Exercicio, (exercicio) => exercicio.categoria)
  exercicio?: Exercicio[];
}
