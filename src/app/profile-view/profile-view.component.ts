import {Component, OnInit, Input} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = {Username: "", Password: "", Email: "", Birthday: ""};

  user: any = {};
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    // public dialogRef: MatDialogRef<ProfileViewComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getThisUser();
  }

  getThisUser(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favMovies = resp.filter(
        (m: {_id: any}) => this.user.FavoriteMovies.indexOf(m._id) >= 0
      );
    });
  }

  editUserInfo(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        console.log("edit successful:", result);
        this.snackBar.open("Personal info successfully changed", "OK", {
          duration: 2000,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
      },
      (error) => {
        console.error("login error:", error);
        if (error.error && typeof error.error === "object") {
          // Log the error object
          console.error("Error object from server:", error.error);
        }
        this.snackBar.open("Personal info could not be changed", "OK", {
          duration: 2000,
        });
      }
    );
  }

  deleteUserProfile(): void {
    this.fetchApiData.deleteUser().subscribe(
      (result) => {
        console.log("Profile successfully deleted", result);
        this.snackBar.open("Profile successfully deleted", "OK", {
          duration: 2000,
        });
        localStorage.clear();
        this.router.navigate(["welcome"]);
      },
      (error) => {
        console.error("login error:", error);
        if (error.error && typeof error.error === "object") {
          // Log the error object
          console.error("Error object from server:", error.error);
        }
        this.snackBar.open("Profile could not be deleted", "OK", {
          duration: 2000,
        });
      }
    );
  }
}
