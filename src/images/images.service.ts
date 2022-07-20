import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Service } from '@ntegral/nestjs-s3';
import { CreateImageDto } from './dto/create-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { deleteObject, genereateImageUrl, setObjectAcl } from 'src/utils/s3Utils';

@Injectable()
export class ImagesService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService
  ) {

  }


  async getUrl() {
    return await genereateImageUrl(this.s3Service)
  }

  async addImage(createImageDto: CreateImageDto) {

    setObjectAcl(createImageDto.key, this.s3Service)
    return await this.prismaService.image.create(
      {
        data:
        {
          product:
            { connect: { id: createImageDto.product_id } },
          url: createImageDto.url,
        }
      })
  }


  async setImageAsMain(imageId: string, productId: string) {
    await this.prismaService.image.updateMany({ data: { preview: false }, where: { AND: { product_id: productId } } });
    return await this.prismaService.image.update({ data: { preview: true }, where: { id: imageId } })
  }

  async getAllImagesForProuct(productId: string) {
    return await this.prismaService.image.findMany({ where: { product_id: productId } });
  }
  async remove(id: string) {
    const image = await this.prismaService.image.findUnique({ where: { id } });
    if (!image) {
      throw new NotFoundException("that image does not exist")
    }
    const imageS3Key = image.url.split('/')[3]
    deleteObject(imageS3Key, this.s3Service)
    return await this.prismaService.image.delete({ where: { id } });
  }
}
