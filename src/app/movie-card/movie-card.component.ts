import {Component, OnInit} from "@angular/core";
import {FetchApiDataService} from "../fetch-api-data.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
// import {MovieDetailDialogComponent} from "../movie-detail-dialog/movie-detail-dialog.component";
import {Router} from "@angular/router";
import {MovieInfoComponent} from "../movie-info/movie-info.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
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
        title: "Synopsis",
        content: description,
      },
      //width: '280px'
    });
  }

  addFavorite(movieID: string): void {
    this.fetchApiData.addMovieToFavorites(movieID).subscribe((result) => {
      this.snackBar.open("Movie added to favorites.", "OK", {
        duration: 2000,
      });
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.removeMovieFromFavorites(id).subscribe((result) => {
      this.snackBar.open("Movie removed from favorites.", "OK", {
        duration: 2000,
      });
    });
  }
}
