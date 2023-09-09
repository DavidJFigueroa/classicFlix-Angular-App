import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";

/**
 * Declaring the api url that will provide data for the client app
 */

const apiUrl = "https://myflix-database-api-9ba401fe0e70.herokuapp.com/";
@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  /**
  * Inject the HttpClient module to the constructor params
  * This will provide HttpClient to the entire class, making it available via this.http 
  * */
  constructor(private http: HttpClient) {}
   /**
   * Making the api call for the user registration endpoint 
   * @param userDetails object with the details of the user
   * @returns an observable with the created user
   * */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

   /**
   * checks if the username and password are correct and gives user a token
   * @param userDetails object with the user's username and password
   * @returns token and user info
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }
    /**
   * fetches all movies from the api
   * @returns array of all movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * fetches the info for one movie from the api
   * @param title title of the movie 
   * @returns movie info
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/" + title, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * fetches the info for one director from the api
   * @param directorName name of the director
   * @returns the director's info
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "directors/" + directorName, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * fetches the info for one genre from the api 
   * @param genreName name of the genre
   * @returns the genre's info
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "genres/" + genreName, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * fetches the info for one user from the api
   * @returns user info
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return this.http
      .get(apiUrl + "users/" + user.Username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
   /**
   * fetches the user's favorite movie array 
   * @returns user's array of favorite movies by id
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return this.http
      .get(apiUrl + "users/" + user.Username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * adds a movie to a user's favorite movie array by movie id
   * @param movieId the movie id
   * @returns user object
    */
  addMovieToFavorites(movieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    user.FavoriteMovies.push(movieID);
    localStorage.setItem("user", JSON.stringify(user));
    return this.http
      .post(apiUrl + "users/" + user.Username + "/movies/" + movieID, movieID, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * deletes a movie from the user's favorite movie array by movie id
   * @param movieId the movie's id
   * @returns user object
   */
  removeMovieFromFavorites(movieID: string): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const index = user.FavoriteMovies.indexOf(movieID);
    console.log(index);
    if (index > -1) {
      // only splice array when item is found
      user.FavoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem("user", JSON.stringify(user));
    return this.http
      .delete(apiUrl + "users/" + user.Username + "/movies/" + movieID, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * checks if a movie is in the user's favorites
   * @param movieID the movie's id
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }
    /*
    * updates the info for a user by username
    * @param updatedUser the new info for the user
    * @returns user object
    */
  editUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return this.http
      .put(apiUrl + "users/" + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
    /**
   * updates the info for a user by username
   * @param updatedUser the new info for the user
   * @returns user object
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return this.http
      .delete(apiUrl + "users/" + user.Username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /** 
  *Non-typed response extraction 
  */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }
}
