import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso NestJS',
      description: 'Fundamentos do Framework NestJS',
      tags: ['node', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Curso #${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    indexCourse >= 0 &&
      (this.courses[indexCourse] = {
        ...this.courses[indexCourse],
        ...updateCourseDto,
      });
  }

  delete(id: string) {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    indexCourse >= 0 && this.courses.splice(indexCourse, 1);
  }
}
