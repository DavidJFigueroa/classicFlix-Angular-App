import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  user: any = {};
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getThisUser();
  }

  /**
   * gets the user's account info and favorite movies from the api
   */
  getThisUser(): void {
    this.fetchApiData.getUser().subscribe(
      (userResponse) => {
        // Update the user data when it's available
        this.user = userResponse;
        this.userData.Username = this.user.Username;
        this.userData.Email = this.user.Email;
        this.userData.Birthday = formatDate(
          this.user.Birthday,
          'yyyy-MM-dd',
          'en-US',
          'UTC+0'
        );

        // Fetch favorite movies once user data is available
        this.fetchFavoriteMovies();
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  /**
   * filters user's favorite movies
   */
  fetchFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favMovies = resp.filter(
        (m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0
      );
    });
  }

  /**
   * edits the user's account info in the api
   */
  editUserInfo(): void {
    this.fetchApiData.editUser(this.userData).subscribe(
      (result) => {
        this.snackBar.open('Personal info successfully changed', 'OK', {
          duration: 2000,
        });
        localStorage.setItem('user', JSON.stringify(result.user));
      },
      (error) => {
        if (error.error && typeof error.error === 'object') {
          // Log the error object
          console.error('Error object from server:', error.error);
        }
        this.snackBar.open('Personal info could not be changed', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * deletes the user's account
   */
  deleteUserProfile(): void {
    this.fetchApiData.deleteUser().subscribe(
      (result) => {
        console.log('Profile successfully deleted', result);
        this.snackBar.open('Profile successfully deleted', 'OK', {
          duration: 2000,
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      },
      (error) => {
        if (error.error && typeof error.error === 'object') {
          // Log the error object
          console.error('Error object from server:', error.error);
        }
        this.snackBar.open('Profile could not be deleted', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description,
      },
      //width: '280px'
    });
  }

  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio,
      },
      //width: '280px'
    });
  }

  openSynopsis(description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: 'Synopsis',
        content: description,
      },
      //width: '280px'
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.removeMovieFromFavorites(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
