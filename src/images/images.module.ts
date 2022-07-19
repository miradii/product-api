import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { S3Module } from '@ntegral/nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        accessKeyId: cfg.get('arvan.accessKeyId'),
        secretAccessKey: cfg.get('arvan.secretKey'),
        endpoint: cfg.get('arvan.endpoint')
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
