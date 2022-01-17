import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  salePrice: string;

  @ApiProperty()
  price: string;
}
