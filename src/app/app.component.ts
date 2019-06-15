import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  colors: Array<any> = [
    {value: 'violet', viewValue: 'Violet'},
    {value: 'indigo', viewValue: 'Indigo'},
    {value: 'blue', viewValue: 'Blue'},
    {value: 'green', viewValue: 'Green'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'red', viewValue: 'Red'}
  ];

  todoObject = {
    text: '',
    selectedColor: '',
    date: '',
    isDone: false,
    isRated: false
  }

  todoList: Array<any> = [];

  ngOnInit(){
    this.todoList = JSON.parse(localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : [];
    this.sortTheTodoObject();
  }

  onSave(){
    let todoObject = Object.assign({}, this.todoObject);
    if(todoObject.text && todoObject.selectedColor){
      this.todoList.push(todoObject);
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    this.todoObject['text'] = ''
    this.sortTheTodoObject();
  }

  sortByRatedColorAndDone(a, b) {
    var sortOrder = {violet: 0, indigo: 1, blue: 2, green: 3, yellow: 4, orange: 5, red: 6};
    var aRated = a.isRated,
        bRated = b.isRated;
    var aDone = a.isDone,
        bDone = b.isDone;
    if( aRated != b.isRated )
      return aRated > bRated ? -1 : 1;
    else if( aDone != b.isDone )
      return aDone < bDone ? -1 : 1;
    else 
      return sortOrder[a.selectedColor] - sortOrder[b.selectedColor];;
}

  markDone(index){
    this.todoList[index].isDone = true;
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
    this.sortTheTodoObject();
  }

  markNotDone(index){
    this.todoList[index].isDone = false;
    localStorage.setItem('todoList', JSON.stringify(this.todoList)); 
    this.sortTheTodoObject();
  }

  delete(index){
    this.todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(this.todoList)); 
  }

  markUnRated(index){
    this.todoList[index].isRated = false;
    localStorage.setItem('todoList', JSON.stringify(this.todoList)); 
    this.sortTheTodoObject();
  }

  markRated(index){
    this.todoList[index].isRated = true;
    localStorage.setItem('todoList', JSON.stringify(this.todoList)); 
    this.sortTheTodoObject();
  }

  onChangeColor(event){
    this.todoObject['selectedColor'] = event.value;
  }

  sortTheTodoObject(){
    this.todoList.sort(this.sortByRatedColorAndDone)
  }

}
