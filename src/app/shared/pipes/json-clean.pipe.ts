import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonClean'
})
export class JsonCleanPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value)
      .replace(/[\[\]{}"]/g, '')
      .replace(/,/g, '.\n')
      .replace(/Disciplina/g, '. Disciplina')
  }
    
  }

