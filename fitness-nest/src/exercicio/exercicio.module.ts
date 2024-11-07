import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "../categoria/categoria.module";
import { ExercicioController } from "./controllers/exercicio.controller";
import { Exercicio } from "./entities/exercicio.entity";
import { ExercicioService } from "./services/exercicio.service";

@Module({
    imports: [TypeOrmModule.forFeature([Exercicio]), CategoriaModule],
    providers: [ExercicioService],
    controllers: [ExercicioController],
    exports: [TypeOrmModule]
})
export class ExercicioModule {}