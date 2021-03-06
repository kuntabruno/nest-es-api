import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  _id: string;

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
