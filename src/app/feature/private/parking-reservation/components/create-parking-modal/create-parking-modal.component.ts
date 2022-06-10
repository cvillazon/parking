import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

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
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateParkingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get isTheFormInvalid() {
    return this.formReservation.invalid;
  }

  initForm() {
    this.formReservation = this.fb.group({
      ownerName: ["", Validators.required],
      date: [this.formatDateTime.format(new Date()), Validators.required],
      hour: ["", [Validators.required, Validators.min(1)]],
      license: ["", [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  setLicenseNumber(license:string){
    console.log(license);
    this.formReservation.get("license").setValue(license);
  }

  generateReservation() {
    console.log(this.formReservation.value);
  }
}
