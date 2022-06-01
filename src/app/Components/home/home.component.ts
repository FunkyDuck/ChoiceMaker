import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/Services/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isActive: boolean = false;
  lists: List[] = [];
  key: string = '';
  item: string = '';

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++) {
      var newList: List = {name: '', data: []};
      newList.name = localStorage.key(i)!;
      this.lists.push(newList);
      if(i==0)
        this.select(newList.name)
    }
  }

  setActive(b: boolean) {
    this.isActive = b;
  }

  select(k: string) {
    this.key = k;
    this.item = '';
  }

  choose() {
    var listItems:List = {name: this.key, data: JSON.parse(localStorage.getItem(this.key)!)};
    this.item = listItems.data[Math.floor(Math.random()*listItems.data.length)];
  }

}
