import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export function validarData(): ValidatorFn{
  return(control: AbstractControl): ValidationErrors | null => {
    const data = new Date(control.value);

    const dataMinima = new Date('2001-01-01');

    const dataMaxima = new Date();
    dataMaxima.setDate(dataMaxima.getDate() + 1);

    if(data < dataMinima || data > dataMaxima){
      return {dataInvalida: true}
    }

    return null;
  }
}

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})


export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.maxLength(400)
      ])],

      autoria: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(3)
      ])],

      data: ['', [Validators.required, validarData()]],

      modelo: ['modelo1'],

      favorito: [false]
    })
    console.log(this.formulario);
  }

  criarPensamento() {
    const data = this.formulario.value.data;

    const dataFormatada = this.datePipe.transform(data, 'dd/MM/yyyy');

    this.formulario.patchValue({ data: dataFormatada })

    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBtn(): string {
    const res: string = (this.formulario.valid) ? 'botao' : 'botao__desabilitado'
    return res
  }

}
