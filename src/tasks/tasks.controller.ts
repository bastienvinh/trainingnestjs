import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {

  constructor(private taskService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  getAllTasks(@Query() filterDto: GetTasksFilterDto) : Array<Task> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto)
    }
    else {
      return this.taskService.getAllTasks()
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) : Task {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) : void {
    this.taskService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ) {
    return this.taskService.updateTaskStatus(id, status)
  }

}
