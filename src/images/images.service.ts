import { Injectable } from '@nestjs/common';
import { S3Service } from '@ntegral/nestjs-s3';
import { randomUUID } from "crypto"
import { CreateImageDto } from './dto/create-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prismaService: PrismaService
  ) {

  }

  private setUpCors() {
    return new Promise((resolve, reject) => {

      const cors = {
        Bucket: 'vitonut', // REQUIRED
        CORSConfiguration: {
          // REQUIRED
          CORSRules: [
            // REQUIRED
            {
              AllowedHeaders: ['*'],
              AllowedMethods: ['PUT'], // REQUIRED
              AllowedOrigins: ['http://localhost:8080',], // REQUIRED
            },
          ],
        },
      };
      this.s3Service.putBucketCors(cors, (err, data) => {
        if (err) {
          reject(new Error("unable to enable cors"))
        } else {
          console.log("cors setup for image upload completed")
          resolve(true);
        }
      })
    })
  }

  private setObjectAcl(key: string) {
    return new Promise((resolve, reject) => {
      this.s3Service.putObjectAcl({
        Bucket: 'protucts-moart',
        ACL: 'public-read',
        Key: key,
      }, (err, data) => {
        if (err) reject(new Error(err.message))
        resolve(data)
      })
    })
  }

  private deleteObject(key) {
    return new Promise((resolve, reject) => {
      this.s3Service.deleteObject({
        Bucket: 'products-read',
        Key: key
      }, (err, data) => {
        if (err) reject(new Error(err.message))
        resolve(data);
      })

    })
  }

  async genereatePresignedUrl() {
    await this.setUpCors()
    const key = `${randomUUID()}.jpeg`
    const url = await this.s3Service.getSignedUrl(
      'putObject',
      {
        Bucket: 'products-moart',
        ContentType: 'image/jpeg',
        Key: key,
      })

    return { key, url }
  }


  async addImage(createImageDto: CreateImageDto) {
    return await this.prismaService.image.create({ data: { product: { connect: { id: createImageDto.product_id } }, url: createImageDto.url, } })
  }


  async setImageAsMain(imageId: string, productId: string) {
    await this.prismaService.image.updateMany({ data: { preview: false }, where: { AND: { product_id: productId } } });
    return await this.prismaService.image.update({ data: { preview: true }, where: { id: imageId } })
  }

  getAllImagesForProuct(productId: string) {
    return this.prismaService.image.findMany({ where: { product_id: productId } });
  }
  remove(id: string) {
    return this.prismaService.image.delete({ where: { id } });
  }
}
