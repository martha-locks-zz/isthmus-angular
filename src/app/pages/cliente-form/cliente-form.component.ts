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
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  // @ViewChild('updateBtn') updateBtn: ElementRef;
  public clienteForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    telefone: new FormControl(''),
    email: new FormControl(''),
    cep: new FormControl(''),
    logradouro: new FormControl('', [Validators.required]),
    complemento: new FormControl(''),
    bairro: new FormControl('', [Validators.required]),
    cidade: new FormControl('', [Validators.required]),
    uf: new FormControl('', [Validators.required]),
  });

  public submitted = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public save() {

    this.submitted = true;

    if (this.clienteForm.valid) {
      const cliente = {
        nome: this.clienteForm.value.nome,
        cpf: this.clienteForm.value.cpf,
        dataNascimento: this.clienteForm.value.dataNascimento,
        sexo: this.clienteForm.value.sexo,
        telefone: this.clienteForm.value.telefone,
        email: this.clienteForm.value.email,
        cep: this.clienteForm.value.cep,
        logradouro: this.clienteForm.value.logradouro,
        complemento: this.clienteForm.value.complemento,
        bairro: this.clienteForm.value.bairro,
        cidade: this.clienteForm.value.cidade,
        uf: this.clienteForm.value.uf
      };

      const cpf = cliente.cpf.replaceAll(".", "").replaceAll("-", "");

      const novoCliente = {
        cpf: cpf,
        cliente: cliente
      };

      const _listClientes = localStorage.getItem('listClientes');

      if (_listClientes) {

        const listClientes = JSON.parse(_listClientes);

        listClientes.push(novoCliente);

        localStorage.setItem('listClientes', JSON.stringify(listClientes));

      } else {

        const listClientes = [
          novoCliente
        ];

        localStorage.setItem('listClientes', JSON.stringify(listClientes));
      }

      this.router.navigate(['/home']);

    }
  }

  public searchCep() {

    const cep: string = this.clienteForm.value.cep;

    if (cep.length === 9) {

      const URL = `https://viacep.com.br/ws/${cep}/json/`;

      this.http.get<any>(URL).subscribe((address: any) => {
        this.fillAddress(address);
      });
    }
  }

  private fillAddress(address: any): void {

    this.clienteForm.get('logradouro')?.setValue(address.logradouro);
    this.clienteForm.get('bairro')?.setValue(address.bairro);
    this.clienteForm.get('cidade')?.setValue(address.localidade);
    this.clienteForm.get('uf')?.setValue(address.uf);
  }
}
