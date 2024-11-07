import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartamentoModule } from "../departamento/departamento.module";
import { DepartamentoService } from "../departamento/services/departamento.service";
import { ColaboradorController } from "./controllers/colaborador.controller";
import { Colaborador } from "./entities/colaborador.entity";
import { ColaboradorService } from "./services/colaborador.service";

@Module({
    imports: [TypeOrmModule.forFeature([Colaborador]), DepartamentoModule],
    providers: [ColaboradorService, DepartamentoService],
    controllers: [ColaboradorController],
    exports: [TypeOrmModule, ColaboradorService]
})
export class ColaboradorModule { }