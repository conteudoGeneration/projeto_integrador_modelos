import { ApiProperty } from "@nestjs/swagger"
import { Transform, TransformFnParams } from "class-transformer"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Oportunidade } from "../../oportunidade/entities/oportunidade.entity"

@Entity({name: "tb_clientes"})
export class Cliente {

    @PrimaryGeneratedColumn() 
    @ApiProperty() 
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 255, nullable: false}) 
    @ApiProperty() 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    @ApiProperty({example: "email@email.com.br"}) 
    email: string

    @Column({length: 5000 }) 
    @ApiProperty() 
    foto: string

    @Column({length: 10000 }) 
    @ApiProperty() 
    historico: string

    @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.cliente)
    @ApiProperty() 
    oportunidade?: Oportunidade[]

}