import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
// import {MovieDetailDialogComponent} from "../movie-detail-dialog/movie-detail-dialog.component";
import { Router } from '@angular/router';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * fetches all movies from the api
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * opens genre info dialog
   * @param name the name of the genre
   * @param description description of the genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description,
      },
      //width: '280px'
    });
  }

  /**
   * opens director info dialog
   * @param name the director's name
   * @param bio bio of the director
   * @param birth date of birth of the director
   */
  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio,
      },
      //width: '280px'
    });
  }
  /**
   * opens movie description dialog
   * @param title the title of the movie
   * @param Description summary of the movie
   */
  openSynopsis(description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: 'Synopsis',
        content: description,
      },
      //width: '280px'
    });
  }

  /**
   * adds the movie (by id) to an array of the user's favorite movies
   * @param id movie id
   */
  addFavorite(movieID: string): void {
    this.fetchApiData.addMovieToFavorites(movieID).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * checks if movie is in array user's favorite movies
   * @param id movie id
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * adds the movie (by id) to an array of the user's favorite movies
   * @param id movie id
   */
  removeFavorite(movieID: string): void {
    this.fetchApiData.removeMovieFromFavorites(movieID).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
    });
  }
}
