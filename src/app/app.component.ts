import { animate } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'notekeep';
  textTitle:string =  '';
  body: string = '';
  
  textArrary: any[] = [];
  text: boolean = false
  noteCount:number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getNotes();
    console.log(this.textArrary.length)
  }
  
  getNotes() {
    this.noteCount = Number(localStorage.getItem('count'));

    for (let i = 0; i < this.noteCount; i++) {
      let note: any = localStorage.getItem(`note${i}`);

      this.textArrary[i] = JSON.parse(note);
      console.log(this.textArrary);
    }
  }


saveData() {
  let i = this.textArrary.length;
  let datas = {id: i + 1, title: this.textTitle, body: this.body};
  console.log(datas)

  // this.textArrary.push(datas);

  localStorage.setItem(`note${i}`, JSON.stringify(datas));
  console.log(this.textArrary)
  this.textTitle = '';
  this.body = '';

  let note: any = localStorage.getItem(`note${i}`);
  this.textArrary[i] = JSON.parse(note);

  this.noteCount++;
  localStorage.setItem('count', String(this.noteCount));
}

  
del(index:number) {
  this.textArrary.splice(index, 1);
    localStorage.clear();

    this.noteCount--;
    localStorage.setItem('count', String(this.noteCount));

    for (let i = 0; i < this.textArrary.length; i++) {
      let note = this.textArrary[i];
      localStorage.setItem(`note${i}`, JSON.stringify(note));
    }
}
}
