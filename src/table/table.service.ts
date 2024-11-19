import { Injectable, NotFoundException } from '@nestjs/common';
import { TableRepository } from './repositories/table.repository';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly tableRepository: TableRepository) { }

  async createTable(data: CreateTableDto) {
    return this.tableRepository.create(data);
  }

  async getAllTables() {
    return this.tableRepository.findAll();
  }

  async getTableById(id: number) {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new NotFoundException('Table not found');
    return table;
  }

  async updateTable(id: number, data: UpdateTableDto) {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new NotFoundException('Table not found');
    return this.tableRepository.update(id, data);
  }

  async deleteTable(id: number) {
    const table = await this.tableRepository.findById(id);
    if (!table) throw new NotFoundException('Table not found');
    await this.tableRepository.delete(id);
    return { message: 'Table successfully deleted' };
  }
}
