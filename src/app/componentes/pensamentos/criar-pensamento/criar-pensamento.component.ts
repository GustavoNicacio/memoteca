import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

<<<<<<< HEAD

=======
>>>>>>> development
  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s|)*\S(.|\s)*/),
        Validators.minLength(7)
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s|)*\S(.|\s)*/),
        Validators.minLength(3)
      ])],
      modelo: ['modelo1', [Validators.required]]
=======

    this.formulario = this.formBuilder.group({

      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])],

      autoria: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(3)
      ])],

      modelo: ['modelo1']
>>>>>>> development
    })
  }

  criarPensamento() {
<<<<<<< HEAD
    console.log(this.formulario.status)
    if (this.formulario.valid){

      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })

    }
=======
    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

>>>>>>> development
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
