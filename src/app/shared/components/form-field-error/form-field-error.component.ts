import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css'],
})
export class FormFieldErrorComponent {
  @Input('form-control') formControl!: AbstractControl;
  public get errorMessage(): string | null {
    if (this.mustShowErrorMEssage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMEssage(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors!['required']) {
      return 'Dado obrigátorio';
    } else if (this.formControl.errors!['email']) {
      return 'Informe um email Valido';
    } else if (this.formControl.errors!['minlength']) {
      const requiredLength =
        this.formControl.errors!['minlength']['requiredLength'];
      return `Deve ter no minimo ${requiredLength} caracteres`;
    } else {
      return null;
    }
  }
}
