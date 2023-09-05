import {Component, OnInit, Input} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = {Username: "", Password: ""};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  // registerUser(): void {
  //   this.fetchApiData.userlogin(this.userData).subscribe(
  //     (result) => {
  //       // Logic for a successful user login goes here! (To be implemented)
  //       this.dialogRef.close(); // This will close the modal on success!
  //       console.log(result);
  //       this.snackBar.open(result, "OK", {
  //         duration: 2000,
  //       });
  //     },
  //     (result) => {
  //       console.log(result);
  //       this.snackBar.open(result, "OK", {
  //         duration: 2000,
  //       });
  //     }
  //   );
  // }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        console.log("login successful:", result);
        this.snackBar.open("login successful", "OK", {
          duration: 2000,
        });
      },
      (error) => {
        console.error("login error:", error);
        if (error.error && typeof error.error === "object") {
          // Log the error object
          console.error("Error object from server:", error.error);
        }
        this.snackBar.open("login failed", "OK", {
          duration: 2000,
        });
      }
    );
  }
}
