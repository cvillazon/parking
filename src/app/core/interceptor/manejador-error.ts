import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { GenericAlertService } from '@core/services/generic-alert.service';
import { environment } from '../../../environments/environment';
import { HTTP_ERRORES_CODIGO } from './http-codigo-error';

@Injectable()
export class ManejadorError implements ErrorHandler {

  constructor(private genericAlert: GenericAlertService){}

  handleError(error: string | Error): void {
    const mensajeError = this.mensajePorDefecto(error);
    this.imprimirErrorConsola(mensajeError);
    this.imprimirErrorEnModal(mensajeError);
  }

  private mensajePorDefecto(error) {
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        return HTTP_ERRORES_CODIGO.NO_HAY_INTERNET;
      }
      if (Object.prototype.hasOwnProperty.call(error,'status') && !Object.prototype.hasOwnProperty.call(error.error,'mensaje')) {
        return this.obtenerErrorHttpCode(error.status);
      }
    }
    return error;
  }
  
  private imprimirErrorEnModal(error) {
    const ERROR_NUMBER=2;
    this.genericAlert.show(ERROR_NUMBER,error);
  }

  private imprimirErrorConsola(mensaje): void {
    const respuesta = {
      fecha: new Date().toLocaleString(),
      path: window.location.href,
      mensaje,
    };
    if (!environment.production) {
      window.console.error('Error inesperado:\n', respuesta);
    }
  }

  private obtenerErrorHttpCode(httpCode: number): string {
    if (Object.prototype.hasOwnProperty.call(HTTP_ERRORES_CODIGO,httpCode)) {
      return HTTP_ERRORES_CODIGO.PETICION_FALLIDA;
    }
    return HTTP_ERRORES_CODIGO[httpCode];
  }
}
