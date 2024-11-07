import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

export function validarData(): ValidatorFn{
  return(control: AbstractControl): ValidationErrors | null => {
    const data = new Date(control.value);

    const dataMinima = new Date('2001-01-01');

    const dataMaxima = new Date();
    dataMaxima.setDate(dataMaxima.getDate() + 1);

    if(data < dataMinima || data > dataMaxima){
      return{dataInvalida: true}
    }
    return null;
  }
}

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: '0',
    conteudo: '',
    autoria: '',
    modelo: '',
    data: '',
    // favorito: false
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    this.service.buscarPorId(id!).subscribe(
      (pensamento) => {
        this.pensamento = pensamento

        let dataFormatada = '';
        if (this.pensamento.data) {
          const [dia, mes, ano] = this.pensamento.data.split('/');
          dataFormatada = `${ano}-${mes}-${dia}`;
        }

        this.formulario = this.formBuilder.group({
          conteudo: [this.pensamento.conteudo, Validators.compose([
              Validators.required,
              Validators.pattern(/(.|\s)*\S(.|\s)*/),
              Validators.maxLength(400)
            ])],
          autoria: [this.pensamento.autoria, Validators.compose([
              Validators.required,
              Validators.pattern(/(.|\s)*\S(.|\s)*/),
              Validators.minLength(3)
            ])],

          data: [dataFormatada, [Validators.required, validarData()]],

          modelo: [this.pensamento.modelo]
        })





      }
    )
  }


  editarPensamento(): void{
    const data = this.formulario.value.data;

    const dataFormatada = this.datePipe.transform(data, 'dd/MM/yyyy');

    this.formulario.patchValue({ data: dataFormatada })

    if(this.formulario.valid){
      const pensamentoAtualizado: Pensamento = {...this.pensamento, ...this.formulario.value};

      this.service.editar(pensamentoAtualizado).subscribe(() => {
        this.router.navigate(["/listarPensamento"])
      });
    }
  }

  cancelar() {
    this.router.navigate(["/listarPensamento"])
  }


  habilitarBtn(): string {
    const res: string = (this.formulario.valid) ? 'botao' : 'botao__desabilitado'
    return res
  }

}
