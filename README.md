# ClassicFlix

This Angular Movie App is a web application that allows users to browse and interact with a collection of movies. Users can register, log in, view movie details, and manage their favorite movies.

![image](https://github.com/DavidJFigueroa/classicFlix-Angular-App/assets/122026800/b7a7bb0c-1cb5-40f7-b311-11da4f2bda1e.png)

![image](https://github.com/DavidJFigueroa/classicFlix-Angular-App/assets/122026800/5f8c2ffc-eadf-461e-82df-f3cf847aca59.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Install

Run `npm install` to install the project 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Dependencies

The Angular Movie App relies on the following dependencies:

1. **Angular**: The core framework for building the Angular application.

   - Version: ^16.2.0
   - npm Package: @angular/core

2. **Angular CDK**: Provides a set of high-quality UI components and utilities for building modern, responsive web applications.

   - Version: ^16.2.2
   - npm Package: @angular/cdk

3. **Angular Material**: A library of UI components that follow the Material Design guidelines for Angular applications.

   - Version: ^16.2.2
   - npm Package: @angular/material

4. **Angular Forms**: Provides support for building and validating forms in Angular applications.

   - Version: ^16.2.0
   - npm Package: @angular/forms

5. **Angular Router**: Enables routing and navigation in Angular applications.

   - Version: ^16.2.0
   - npm Package: @angular/router

6. **RxJS**: A library for reactive programming using Observables.

   - Version: ~7.8.0
   - npm Package: rxjs

7. **HttpClient**: A module for making HTTP requests in Angular applications.

   - Module: @angular/common/http
   - Classes: HttpHeaders, HttpErrorResponse

8. **Zone.js**: A library that helps Angular manage asynchronous operations within the application.

   - Version: ~0.13.0
   - npm Package: zone.js

9. **Jasmine**: A behavior-driven development (BDD) testing framework for JavaScript.

   - Version: ~4.6.0
   - npm Package: jasmine-core

10. **Karma**: A test runner for JavaScript that works with Jasmine for running unit tests.

    - Version: ~6.4.0
    - npm Package: karma

11. **TypeScript**: A superset of JavaScript that provides type checking and static analysis.

    - Version: ~5.1.3
    - npm Package: typescript

### FetchApiDataService

The `FetchApiDataService` is a service within the Angular Movie App responsible for making API requests to retrieve data from the server. It includes methods for user registration, login, fetching movies, directors, genres, user information, and managing favorite movies. Below is a summary of its methods:

1. `userRegistration(userDetails: any): Observable<any>`:

   - Registers a new user.
   - Returns an observable with the created user.

2. `userLogin(userDetails: any): Observable<any>`:

   - Logs in a user with provided credentials.
   - Returns a token and user info.

3. `getAllMovies(): Observable<any>`:

   - Fetches all movies from the API.
   - Returns an array of all movies.

4. `getOneMovie(title: string): Observable<any>`:

   - Fetches information for a single movie by title.
   - Returns movie info.

5. `getDirector(directorName: string): Observable<any>`:

   - Fetches information for a director by name.
   - Returns the director's info.

6. `getGenre(genreName: string): Observable<any>`:

   - Fetches information for a genre by name.
   - Returns the genre's info.

7. `getUser(): Observable<any>`:

   - Fetches information for the currently logged-in user.
   - Returns user info.

8. `getFavoriteMovies(): Observable<any>`:

   - Fetches the user's array of favorite movies by ID.

9. `addMovieToFavorites(movieID: string): Observable<any>`:

   - Adds a movie to a user's list of favorite movies by movie ID.
   - Returns the user object.

10. `removeMovieFromFavorites(movieID: string): Observable<any>`:

    - Deletes a movie from the user's list of favorite movies by movie ID.
    - Returns the user object.

11. `isFavoriteMovie(movieId: string): boolean`:

    - Checks if a movie is in the user's list of favorite movies.
    - Returns `true` if the movie is a favorite, `false` otherwise.

12. `editUser(updatedUser: any): Observable<any>`:

    - Updates user information for the currently logged-in user.
    - Returns the updated user object.

13. `deleteUser(): Observable<any>`:

    - Deletes the user's profile.
    - Returns the result of the deletion operation.


