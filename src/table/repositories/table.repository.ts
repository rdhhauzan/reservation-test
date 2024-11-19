import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Table } from '@prisma/client';

@Injectable()
export class TableRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: Prisma.TableCreateInput): Promise<Table> {
    return this.prisma.table.create({ data });
  }

  async findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async findById(id: number): Promise<Table | null> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TableUpdateInput): Promise<Table> {
    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Table> {
    return this.prisma.table.delete({ where: { id } });
  }
}
