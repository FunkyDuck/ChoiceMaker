import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { List } from 'src/app/Services/list';
import { F_LIST } from '../list.form';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {
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
  }

  displayCreate(b: boolean) {
    this.isCreate = b;
  }

  displayAdd(b: boolean, key: string){
    this.isCreate = false;
    this.isDisplay = false;
    this.isAddValue = b;
    this.addListKey = key;
  }

  displayList(b: boolean, key: string){
    this.isCreate = false;
    this.isAddValue = false;
    this.isDisplay = b;
    this.addListKey = key;
    this.itemsList = []
    this.itemsList.push('No Data Found...');
    
    this.itemsList = JSON.parse(localStorage.getItem(key)!);
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
      var newList: List = {name: '', data: []};
      newList.name = localStorage.key(i)!;
      this.lists.push(newList);
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
  }

  viewList(key: string) {

  }
}
