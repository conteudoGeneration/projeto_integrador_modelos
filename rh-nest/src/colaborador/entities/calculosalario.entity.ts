import { ApiProperty } from "@nestjs/swagger";

export class CalculoSalario {
  
  @ApiProperty() 
  totalHorasExtras: number;

  @ApiProperty() 
  descontos: number;
  
}
