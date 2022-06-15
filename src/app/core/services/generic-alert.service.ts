import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertActionsComponent } from '@core/components/alert-actions/alert-actions.component';
import { EntryData } from '@core/model/entry-data';

@Injectable()
/**
 * This allows us to launch generic modalities, whenever we want with its perzonaliable content, we can change the icon, titles, subtitles, action buttons.
 */
export class GenericAlertService {
  public dialogRef: MatDialogRef<any>;
  constructor(public dialog: MatDialog){}

  /**
   * 
   * @param type Tipo de alerta, una manera rapida de mostrar una alert como Exitosa o fallida
   *            * 1-> Exitoso = Icono SeedAtTheTable
   *            * 2-> Fallido = Icono de Fallo ("X").
   * @param message Mensaje simple a mostrar, si necesita mostrar algo mas elaborado, pero en el parametro dinamicConfig
   *                debera pasar un objeto con la configuración personalizada
   * @param classContainer Por Defecto tiene algunos estilos para su contenedor (modal), si desea cambiarlo debera pasar la clase que contiene esos estilos
   *                importante saber que para cambiar los estilos del contenedor junto con el contenido la clase debera ser asi .name_class .mat-dialog-container
   * @param callback Accion que se quiera realizar luego de cerrado del modal, dicho callback recibe un valor numerico 1/2 referentes a cada boton.
   * @param dinamicConfig (Optional) Si queremos pasar nuestra propia configuración lo haremos
   *                desde aqui, Recibe un objeto de tipo entryData. Si usamos este parametro los anteriores serán
   *                omitidos.
   */
  show(type=1,
       message='Action Done',
       classContainer?: string,
       dinamicConfig?: EntryData,
       callback?: Function): void{
    if(dinamicConfig){
      this.dialogRef=this.dialog.open(AlertActionsComponent,{
        data:dinamicConfig,
        panelClass:classContainer?classContainer:'class-container-generic-alert'
      });

      this.dialogRef.beforeClosed().subscribe((result: number) => {
        if(callback){
          callback(result);
        } 
      });
    }else{
      const obj = type===1?this.configSuccesfully(message):this.configError(message);

      this.dialogRef=this.dialog.open(AlertActionsComponent,{
        data:obj,
        panelClass:classContainer?classContainer:'class-container-generic-alert'
      });

      this.dialogRef.beforeClosed().subscribe((result: number) => {
        if(callback){
          callback(result);
        } 
      });
    }
  }

  closes(){
    this.dialogRef?.close();
  }

  private configSuccesfully(message: string){
    return{
      icon:'adn-success',
      subtitle:message,
      text_button1:'OK',
    };
  }
  
  private configError(message: string){
    return{
      subtitle:message,
      text_button1:'OK',
      icon:'adn-error'
    };
  }
}
