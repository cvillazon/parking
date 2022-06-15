import { Component, OnInit } from '@angular/core';
import { Parking } from '../shared/model/parking';
import { ParkingService } from '../shared/services/parking.service';

@Component({
  selector: 'app-license-plates',
  templateUrl: './license-plates.component.html',
  styleUrls: ['./license-plates.component.scss']
})
export class LicensePlatesComponent implements OnInit {

  public dateOpt: any = {
    timeStyle: 'medium',
    dateStyle: 'short',
  };
  public formatDateTime = new Intl.DateTimeFormat('en', this.dateOpt);
  public historyParked: Parking[];
  public groupByLicense: any[];
  constructor(private parking: ParkingService) { }

  ngOnInit(): void {
    this.getAllLicensePlates();
  }

  getAllLicensePlates(){
    this.parking.loadAllLicensePlates().subscribe((data: Parking[]) =>{
      this.historyParked=data;
      this.groupByLicensePlates();
    });
  }

  groupByLicensePlates(){
    const carGroupedArray=[];
    const carGrouped={};
    let aux;
    this.historyParked.forEach((car: Parking)=>{
      aux =carGrouped[car.license];
      if(aux){
        const carStored: Parking = Object.assign({},carGroupedArray[aux.position]); 

        carStored.frecuency=carStored.frecuency+1;
        carStored.date=this.formatDateTime.format(new Date(Math.min(carStored.timeStart,car.timeStart)));
        carStored.hour=carStored.hour+car.hour;

        carGroupedArray[aux.position]=carStored;
      }else{
        carGrouped[car.license]={
          position:carGroupedArray.length
        };
        carGroupedArray.push({
          frecuency:1,
          date:car.date,
          timeStart:car.timeStart,
          owner:car.owner,
          hour:car.hour,
          license:car.license
        });
      }
    });

    this.groupByLicense=carGroupedArray;
  }

}