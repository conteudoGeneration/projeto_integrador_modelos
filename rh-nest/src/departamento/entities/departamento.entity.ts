import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Colaborador } from "../../colaborador/entities/colaborador.entity";

@Entity({name: "tb_departamentos"}) 
export class Departamento{

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ length: 5000 })
  @ApiProperty()
  icone: string;

  @ApiProperty()
  @OneToMany(() => Colaborador, (colaborador) => colaborador.departamento)
  colaborador?: Colaborador[];

}

