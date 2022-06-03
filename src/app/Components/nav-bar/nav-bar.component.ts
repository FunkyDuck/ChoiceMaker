import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setTheme(localStorage.getItem('theme')!);
  }

  setTheme(t: string) {var nav = document.querySelector("nav");
    var a = document.querySelectorAll('a');
    var h1 = document.querySelector('h1');

    nav?.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
    nav?.classList.add('color' + t);

    a.forEach(function(e){
      e.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
      e.classList.add('color' + t);
    });

    h1?.classList.remove('colorDefault', 'txtDefault', 'colorBlue', 'txtBlue', 'colorYellow', 'txtYellow', 'colorRed', 'txtRed', 'btnDelRed', 'colorDark', 'txtDark');
    h1?.classList.add('txt' + t);
    
    localStorage.setItem('theme',t);
  }

}
