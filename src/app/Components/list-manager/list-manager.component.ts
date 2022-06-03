import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from 'src/app/Services/list';
import { F_LIST } from '../list.form';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit, AfterViewInit {

  isCreate: boolean = false;
  isAddValue: boolean = false;
  isDisplay: boolean = false;

  addListKey = '';
  itemsList: string[] = [];

  lists: List[] = [];
  listForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.listForm = this._fb.group(F_LIST);
  }

  ngOnInit(): void {
    this.storageToList();
    this.setTheme(localStorage.getItem('theme')!);
  }

  ngAfterViewInit(): void {
    this.setTheme(localStorage.getItem('theme')!);
  }

  displayCreate(b: boolean) {
    this.isCreate = b;
    setTimeout(()=>{
      this.setTheme(localStorage.getItem('theme')!);
    }, 0);
  }

  displayAdd(b: boolean, key: string){
    this.isCreate = false;
    this.isDisplay = false;
    this.isAddValue = b;
    this.addListKey = key;
    setTimeout(()=>{
      this.setTheme(localStorage.getItem('theme')!);
    },0);
  }

  displayList(b: boolean, key: string){
    this.isCreate = false;
    this.isAddValue = false;
    this.isDisplay = b;
    this.addListKey = key;
    this.itemsList = []
    this.itemsList.push('No Data Found...');
    
    this.itemsList = JSON.parse(localStorage.getItem(key)!);

    setTimeout(()=>{
      this.setTheme(localStorage.getItem('theme')!);
    },0);
  }

  createList() {
    this.displayAdd(false, '');
    localStorage.setItem(this.listForm.value.name, JSON.stringify({}));
    this.storageToList();
    this.listForm.reset();
    this.isCreate = false;
  }

  storageToList() {
    this.displayAdd(false, '');
    this.lists.length = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i)!='theme'){
        var newList: List = {name: '', data: []};
      newList.name = localStorage.key(i)!;
      this.lists.push(newList);
      }
    }
  }

  deleteToStorage(key: string) {
    this.displayAdd(false, '');
    localStorage.removeItem(key);
    this.storageToList();
  }

  addToList(key: string) {
    var list: List = {name: key, data: JSON.parse(localStorage.getItem(key)!) };
    var elems: string[] = [];

    for (let i = 0; i < list.data.length; i++) {
      elems.push(list.data[i]);
    }
    elems.push(this.listForm.value.name);

    list.data = elems;
    localStorage.setItem(key, JSON.stringify(list.data));

    this.storageToList();
    this.listForm.reset();

    this.displayList(true, list.name);
  }

  deleteItem(item: string) {
    var list: List = {name: this.addListKey, data: JSON.parse(localStorage.getItem(this.addListKey)!) };
    var elems: string[] = [];

    for (let i = 0; i < list.data.length; i++) {
      if(list.data[i] != item)
        elems.push(list.data[i]);
    }
    elems.push(this.listForm.value.name);

    list.data = elems;
    list.data.length -= 1;
    localStorage.setItem(this.addListKey, JSON.stringify(list.data));

    this.storageToList();
    this.listForm.reset();

    this.displayList(true, list.name);
  }

  setTheme(c: string = 'default'){
    var h1 = document.querySelector('h1');
    var h2 = document.querySelectorAll('h2');
    var btn = document.querySelectorAll('button');

    h1?.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
    h1?.classList.add('txt' + c);

    h2.forEach(function(e){
      e.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
      e.classList.add('txt' + c);
    });
    btn.forEach(function(e){
      if(!e.classList.contains('btnDel')){
        e.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
        e.classList.add('color' + c);
      }else if(c == 'Red'){
        e.classList.add('btnDelRed');
      }else{
        e.classList.remove('btnDelRed');
      }
    });
  }
}
