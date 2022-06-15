import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { LicenseInputComponent } from './components/license-input/license-input.component';
import { OnlyTypeDirective } from './components/license-input/directive/only-type.directive';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    HeaderComponent,
    LicenseInputComponent,
    OnlyTypeDirective,
  ],
  imports: [ReactiveFormsModule, FormsModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    LicenseInputComponent,
  ]
})
export class SharedModule { }
