import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsObject } from 'class-validator'

export class CreateProductDto {
  @ApiProperty()
  @IsObject()
  name: Record<string, string>

  @ApiProperty()
  @IsObject()
  description: Record<string, string>

  @ApiProperty()
  @IsNumber()
  price: number
}
