import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cliente } from "../../cliente/entities/cliente.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { NumericTransformer } from "../../util/numerictransformer";

@Entity({name: "tb_oportunidades"}) 
export class Oportunidade{

    @PrimaryGeneratedColumn() 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() 
    @Column({length: 255, nullable: false})
    @ApiProperty() 
    nome: string;
 
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    valor: number

    @CreateDateColumn() 
    @ApiProperty() 
    dataAbertura: Date;

    @ApiProperty()
    @IsDateString()
    @Column({ type: "date", nullable: false})
    dataFechamento: Date

    @Min(1)
    @Max(3)
    @IsOptional()
    @IsPositive()
    @Column({ type: "int", default: 1 })
    status: number

    @ManyToOne(() => Cliente, (cliente) => cliente.oportunidade, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Cliente }) 
    cliente: Cliente;

    @ManyToOne(() => Usuario, (usuario) => usuario.oportunidade, {
        onDelete: "CASCADE"
    })
    @ApiProperty({ type: () => Usuario }) 
    usuario: Usuario;
}

