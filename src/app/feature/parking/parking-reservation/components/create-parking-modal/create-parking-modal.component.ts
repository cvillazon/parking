import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CreateParking } from '@parking/shared/model/create-parking-data';
import { Parking } from '@parking/shared/model/parking';
import { ParkingService } from '@parking/shared/services/parking.service';
import { formatDateGlobal } from '@parking/shared/utils/format-date';
import { getRandomCar } from '@parking/shared/utils/list-car';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-create-parking-modal',
  templateUrl: './create-parking-modal.component.html',
  styleUrls: ['./create-parking-modal.component.scss'],
})
export class CreateParkingModalComponent implements OnInit {
  formatDateTime = new Intl.DateTimeFormat('en', formatDateGlobal);
  formReservation: FormGroup;

  constructor(
    private parking: ParkingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateParkingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public car: CreateParking
  ) {}

  get isTheFormInvalid():boolean {
    return this.formReservation.invalid;
  }

  get basePrice():number{
    return this.car.basePrice*this.formReservation.get('hour').value;
  }

  get extraOnDemand():number{
    return this.car.onDemand*this.formReservation.get('hour').value;
  }

  get extraWeekend():number{
    return this.car.dominical*this.formReservation.get('hour').value;
  }
  
  get totalPrice(){
    return this.basePrice+this.extraOnDemand+this.extraWeekend;
  }
  
  ngOnInit(): void {
    this.initForm();
    this.setSpot();
  }

  initForm() {
    this.formReservation = this.fb.group({
      serviceOut: [false],
      spot: [''],
      carType: [''],
      owner: ['', Validators.required],
      hour: ['', [Validators.required, Validators.min(1)]],
      license: ['', [Validators.required]],
      date: [this.formatDateTime.format(new Date()), Validators.required],
      dateEnd: [''],
      timeStart: [''],
      timeEnd: [''],
    });
  }

  close(reservation: Parking): void {
    this.dialogRef.close(reservation);
  }

  setLicenseNumber(license: string) {
    this.formReservation.get('license').setValue(license);
  }

  setSpot() {
    this.formReservation.get('spot').setValue(this.car.spot);
  }

  setCar() {
    const carType = getRandomCar();
    this.formReservation.get('carType').setValue(carType.src);
  }

  setDateTimes() {
    const MILLISECONDS = 1000;
    const SECONDS = 60;
    const MINUTES = 60;

    const start = new Date().getTime();
    const end = start + MILLISECONDS * SECONDS * MINUTES * this.formReservation.get('hour').value;
    const formatEnd = this.formatDateTime.format(new Date(end));

    this.formReservation.get('timeStart').setValue(start);
    this.formReservation.get('timeEnd').setValue(end);
    this.formReservation.get('dateEnd').setValue(formatEnd);
  }

  islicensePlateDuplicated(licensePlate: string) {
    return this.car.cars.find((carInDb) => {
      return carInDb.license.toLowerCase() === licensePlate;
    })
      ? true
      : false;
  }

  generateReservation() {
    if (this.isTheFormInvalid===false) {
      this.setDateTimes();
      this.setCar();
      const carModel = this.formReservation.value;
      carModel.totalPrice=this.totalPrice;
      // return;
      if (!this.islicensePlateDuplicated(carModel.license)) {
        this.parking.createReservation(carModel).subscribe((data: Parking) => this.close(data));
      }
    }
  }
}
