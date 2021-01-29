import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listClientes = [];

  constructor() { }

  ngOnInit(): void {

    const _listClientes = localStorage.getItem('listClientes');

    if (_listClientes) {
      this.listClientes = JSON.parse(_listClientes);
    }
  }

}
