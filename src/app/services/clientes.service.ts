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
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly LIST_NAME = 'listClientes';

  constructor() {

    let listClientes: any = localStorage.getItem(this.LIST_NAME);

    if (!listClientes) {

      listClientes = [];

      localStorage.setItem(this.LIST_NAME, JSON.stringify(listClientes));
    }
  }

  public getListClientes(): any {

    const listClientes: any = localStorage.getItem(this.LIST_NAME);

    return JSON.parse(listClientes);
  }

  public setCliente(novoCliente: any): void {

    const listClientes: any = this.getListClientes();

    listClientes.push(novoCliente);

    localStorage.setItem(this.LIST_NAME, JSON.stringify(listClientes));
  }

  public getClienteByCpf(cpf: string): any {

    const result = this.getListClientes().filter((pessoa: any) => pessoa.cpf === cpf);

    return result;
  }

  public deleteClienteByCpf(cpf: string): void {

    const result = this.getListClientes().filter((pessoa: any) => pessoa.cpf !== cpf);

    localStorage.setItem(this.LIST_NAME, JSON.stringify(result));
  }
}
