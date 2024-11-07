import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VeiculoModule } from "../veiculo/veiculo.module";
import { ViagemController } from "./controllers/viagem.controller";
import { Viagem } from "./entities/viagem.entity";
import { ViagemService } from "./services/viagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Viagem]), VeiculoModule],
    providers: [ViagemService],
    controllers: [ViagemController],
    exports: [TypeOrmModule]
})

export class ViagemModule { }