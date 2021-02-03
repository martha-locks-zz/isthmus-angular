/*
 * The MIT License
 *
 * Copyright 2021 Martha Ribeiro Locks.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Guarda a lista de clientes que vem do local storage
  public listClientes = Array();
  //Guarda o cliente que vem do service para ser excluido
  public cliente: any;
  //Variáveis que controlam as mensagens de alerta
  public showDeleteMsg: boolean | undefined;
  public showSavedMsg: boolean | undefined;
  public showUpdatedMsg: boolean | undefined;
  //Guarda o cpf que será editado e visualizado
  private cpf: any;

  constructor(
    private clientesService: ClientesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadClientes();

    this.activatedRoute.queryParams.subscribe(params => {
      this.showSavedMsg = params['saved'];
      this.showUpdatedMsg = params['updated'];
    });
  }

  public showModal(cpf: any, cliente: any): void {

    this.cpf = cpf;
    this.cliente = cliente;

    this.showDeleteMsg = false;
    $('#deleteModal').modal('show');
  }

  public delete(): void {

    if (this.cpf) {

      this.clientesService.deleteClienteByCpf(this.cpf);

      this.loadClientes();

      this.showDeleteMsg = true;

      $('#deleteModal').modal('hide')
    }

  }

  private loadClientes(): void {
    this.listClientes = this.clientesService.getListClientes();
  }
}
