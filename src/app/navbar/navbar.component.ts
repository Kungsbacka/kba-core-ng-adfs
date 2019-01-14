import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private collapse: boolean = false;

  public collapseNav(): boolean {
    return false;
  }

  constructor() { }

  ngOnInit() {
    this.collapse = false;
  }
}
