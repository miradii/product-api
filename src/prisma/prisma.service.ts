import { PrismaClient } from '.prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleDestroy() {
        await this.$disconnect()
    }
    async onModuleInit() {
        await this.$connect()
    }
}
