import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;  // global에 prisma 속성을 추가
}

export {};