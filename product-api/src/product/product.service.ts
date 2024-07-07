import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dtos/create-product.dto'

@Injectable()
export class ProductService {
  createProduct(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto
  }
}
