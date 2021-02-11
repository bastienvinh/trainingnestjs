import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any, _metadata: ArgumentMetadata) {

    if (!value) {
      throw new BadRequestException(`"${value}" is an invalid status`)
    }

    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`)
    }

    return value
  }

  private isStatusValid(status: any) : boolean {
    return this.allowedStatuses.includes(status)
  }

}