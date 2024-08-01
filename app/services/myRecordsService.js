

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRecord(data) {
  return prisma.myRecords.create({ data });
}

export async function getRecords() {
  return prisma.myRecords.findMany();
}

export async function getRecord(id) {
  return prisma.myRecords.findUnique({ where: { id } });
}

export async function updateRecord(id, data) {
  return prisma.myRecords.update({
    where: { id },
    data,
  });
}

export async function deleteRecord(id) {
  return prisma.myRecords.delete({ where: { id } });
}
