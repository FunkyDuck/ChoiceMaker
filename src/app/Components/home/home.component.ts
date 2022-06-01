import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  setActive(b: boolean) {
    this.isActive = b;
  }

}
