import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateUrl} from "../shared/validators/validateUrl";
@Component({
  selector: 'detalle-form',
  templateUrl: './detalle-form.component.html',
  styleUrls: ['./detalle-form.component.css']
})
export class DetalleFormComponent implements OnInit, OnChanges {


    form:FormGroup;

    @Input()
    initialValue:any;

    constructor(private fb:FormBuilder) {

        this.form = this.fb.group({
            dueno: ['',Validators.required],
            url: ['',Validators.required]
        });


    }

    //Capturo los valores
    ngOnChanges(changes:SimpleChanges) {
        if (changes['initialValue']) {
            this.form.patchValue(changes['initialValue'].currentValue);
        }
    }

    ngOnInit() {

    }
    //Avisa si hay errores para que salga mensaje de error
    isErrorVisible(field:string, error:string) {

        return this.form.controls[field].dirty
                && this.form.controls[field].errors &&
                this.form.controls[field].errors[error];

    }

    //Vacia el formulario una vez que se ha creado un detalle
    reset() {
        this.form.reset();
    }

    //Da el visto bueno a la validacion y activa la insercion
    get valid() {
        return this.form.valid;
    }
    //Envia los valores
    get value() {
        return this.form.value;
    }

}
