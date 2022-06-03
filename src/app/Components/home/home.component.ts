import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from 'src/app/Services/list';
import { F_LIST } from '../list.form';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isActive: boolean = false;
  lists: List[] = [];
  listForm: FormGroup;
  key: string = '';
  item: string = '';
  tmpList: string[] = [];

  constructor(private _fb: FormBuilder) {
    this.listForm = this._fb.group(F_LIST);
  }

  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i) != 'theme'){
        var newList: List = {name: '', data: []};
        newList.name = localStorage.key(i)!;
        this.lists.push(newList);
        if(i==0)
          this.select(newList.name)
      }
    }
  }

  ngAfterViewInit(): void {
    this.setTheme(localStorage.getItem('theme')!);
  }

  setActive(b: boolean) {
    this.isActive = b;
    setTimeout(() => {
      this.setTheme(localStorage.getItem('theme')!);
    }, 0);
  }

  select(k: string) {
    this.key = k;
    this.item = '';
  }

  choose() {
    var listItems:List = {name: this.key, data: JSON.parse(localStorage.getItem(this.key)!)};
    this.item = listItems.data[Math.floor(Math.random()*listItems.data.length)];
  }

  addTmpList() {
    this.tmpList.push(this.listForm.value.name);
    this.listForm.reset();
  }

  chooseTmpList() {
    this.item = this.tmpList[Math.floor(Math.random()*this.tmpList.length)];
  }

  setTheme(c: string = 'default'){
    var h1 = document.querySelector('h1');
    var h2 = document.querySelectorAll('h2');
    var btn = document.querySelectorAll('button');
    var opt = document.querySelectorAll('option');
    
    h1?.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
    h1?.classList.add('txt' + c);

    h2.forEach(function(e){
      e.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
      e.classList.add('txt' + c);
    });
    btn.forEach(function(e){
      e.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
      e.classList.add('color' + c);
    });
    opt.forEach(function(e){
      e.classList.remove('optionDefault', 'optionBlue', 'optionYellow', 'optionRed', 'optionDark');
      e.classList.add('option' + c);
    });
  }

}
