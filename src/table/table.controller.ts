import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) { }

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.createTable(createTableDto);
  }

  @Get()
  findAll() {
    return this.tableService.getAllTables();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.getTableById(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.updateTable(Number(id), updateTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.deleteTable(Number(id));
  }
}
