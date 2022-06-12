import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ParkingService } from "../../../shared/services/parking.service";
import { getRandomCar } from "../../../shared/utils/list-car";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-create-parking-modal",
  templateUrl: "./create-parking-modal.component.html",
  styleUrls: ["./create-parking-modal.component.scss"],
})
export class CreateParkingModalComponent implements OnInit {
  public dateOpt: any = {
    timeStyle: "medium",
    dateStyle: "short",
  };
  public formatDateTime = new Intl.DateTimeFormat("en", this.dateOpt);
  public formReservation: FormGroup;
  
  constructor(
    private parking:ParkingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateParkingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public car: any
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setSpot();
  }

  get isTheFormInvalid() {
    return this.formReservation.invalid;
  }

  initForm() {
    this.formReservation = this.fb.group({
      serviceOut: [false],
      spot:[''],
      carType:[''],
      owner: ['', Validators.required],
      hour: ['', [Validators.required, Validators.min(1)]],
      license: ['', [Validators.required]],
      date: [this.formatDateTime.format(new Date()), Validators.required],
      dateEnd: [''],
      timeStart: [''],
      timeEnd: [''],
    });
  }

  close(reservation:any): void {
    this.dialogRef.close(reservation);
  }

  setLicenseNumber(license:string){
    this.formReservation.get("license").setValue(license);
  }

  setSpot(){
    this.formReservation.get('spot').setValue(this.car.spot)
  }
  
  setCar(){
    let carType = getRandomCar();
    this.formReservation.get('carType').setValue(carType.src)
  }

  setDateTimes(){
    let start = new Date().getTime();
    let end = start+(1000*60*60*this.formReservation.get('hour').value);
    let formatEnd = this.formatDateTime.format(new Date(end));

    this.formReservation.get("timeStart").setValue(start);
    this.formReservation.get("timeEnd").setValue(end);
    this.formReservation.get("dateEnd").setValue(formatEnd);
  }

  generateReservation() {
    if(!this.isTheFormInvalid){
      this.setDateTimes();
      this.setCar()
      this.parking.createReservation(this.formReservation.value).subscribe((data:any) =>{
        this.close(data);
      });
    }
  }
}
