import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dtos/create-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Languages } from './entities/language.entity'
import { Like, Repository } from 'typeorm'
import { Products } from './entities/product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Languages)
    private languageRepo: Repository<Languages>,
    @InjectRepository(Products)
    private productRepo: Repository<Products>
  ) {}
  async createProduct(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto

    const languages = await this.languageRepo.find()

    const createdNames = []
    for (const languageCode in name) {
      const languageId = languages.find(
        (language) => language.code == languageCode
      ).id
      const element = name[languageCode]
      createdNames.push({ languageId, name: element })
    }

    const createdDescriptions = []
    for (const languageCode in description) {
      const languageId = languages.find(
        (language) => language.code == languageCode
      ).id
      const element = description[languageCode]
      createdDescriptions.push({ languageId, description: element })
    }

    const product = this.productRepo.create({
      names: createdNames,
      descriptions: createdDescriptions,
      price,
    })
    return await this.productRepo.save(product)
  }

  async searchProduct(word: string) {
    return await this.productRepo.find({
      where: {
        names: {
          name: Like(word),
        },
        descriptions: {
          description: Like(word),
        },
      },
      relations: {
        names: true,
        descriptions: true,
      },
    })
  }
}
