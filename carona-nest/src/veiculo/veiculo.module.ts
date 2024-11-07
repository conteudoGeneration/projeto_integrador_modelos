import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VeiculoController } from "./controllers/veiculo.controller";
import { Veiculo } from "./entities/veiculo.entity";
import { VeiculoService } from "./services/veiculo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Veiculo])],
    providers: [VeiculoService],
    controllers: [VeiculoController],
    exports: [TypeOrmModule, VeiculoService]
})
export class VeiculoModule { }