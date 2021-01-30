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
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

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
  public showMessageCpf = false;
  public isUpdating = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private clientesService: ClientesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const cpf: any = this.route.snapshot.paramMap.get('cpf');

    const result = this.clientesService.getClienteByCpf(cpf);

    if (result.length > 0) {

      const cliente = (result[0]).cliente;

      this.isUpdating = true;

      this.fillForm(cliente);
    }
  }

  public save() {

    this.submitted = true;

    if (this.clienteForm.valid && !this.showMessageCpf) {

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

      if (this.isUpdating) {
        this.clientesService.deleteClienteByCpf(cpf);
      }

      this.clientesService.setCliente(novoCliente);


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

  public searchCpf($event: any): void {

    const cpf: any = $event?.target?.value?.replaceAll(".", "").replaceAll("-", "");

    if (cpf && cpf.length === 11) {
      this.showMessageCpf = this.clientesService.getClienteByCpf(cpf).length > 0;
    }
  }

  private fillForm(cliente: any): void {

    this.clienteForm.get('nome')?.setValue(cliente.nome);
    this.clienteForm.get('cpf')?.setValue(cliente.cpf);
    this.clienteForm.get('dataNascimento')?.setValue(cliente.dataNascimento);
    this.clienteForm.get('sexo')?.setValue(cliente.sexo);
    this.clienteForm.get('telefone')?.setValue(cliente.telefone);
    this.clienteForm.get('email')?.setValue(cliente.email);
    this.clienteForm.get('cep')?.setValue(cliente.cep);
    this.clienteForm.get('logradouro')?.setValue(cliente.logradouro);
    this.clienteForm.get('complemento')?.setValue(cliente.complemento);
    this.clienteForm.get('bairro')?.setValue(cliente.bairro);
    this.clienteForm.get('cidade')?.setValue(cliente.cidade);
    this.clienteForm.get('uf')?.setValue(cliente.uf);
  }

  private fillAddress(address: any): void {

    this.clienteForm.get('logradouro')?.setValue(address.logradouro);
    this.clienteForm.get('bairro')?.setValue(address.bairro);
    this.clienteForm.get('cidade')?.setValue(address.localidade);
    this.clienteForm.get('uf')?.setValue(address.uf);
  }

}
