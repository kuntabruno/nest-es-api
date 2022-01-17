import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  salePrice: string;

  @Prop()
  category: string;

  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
