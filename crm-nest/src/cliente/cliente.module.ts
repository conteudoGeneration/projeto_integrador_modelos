import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClienteController } from "./controllers/cliente.controller";
import { Cliente } from "./entities/cliente.entity";
import { ClienteService } from "./services/cliente.service";

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [TypeOrmModule, ClienteService]
})
export class ClienteModule { }