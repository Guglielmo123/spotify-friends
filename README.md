# Spotify Friends

<br>



## Description

Search platform for music available in Spotify where you can favorite and comment on songs. -Bonus: Posting these comments in a feed section where friends can interact.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage and filter by artist, then albums then songs, preview the songs, log in and sign up.
- **sign up** - As a user I want to sign up on the web page so that I can add favorite songs to my list and comment.
- **login** - As a user I want to be able to log in on the web page so that I can get back to my account
- **logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account
- **favorite list** - As a user I want to see the list of my favorites and delete them.
- **comments list** - As a user I want to see the list of my comments in songs and delete them.
- **edit user** - As a user I want to be able to edit my profile; profile picture with a default anonymous one.
- **result** - As a user I want to see the list of artist filter by name.
- **artists listing** - As a user I want to see more details of the artist, be able to view their albums and songs and save it as favorites.



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                 |                                                          |
| `GET`      | `/login`                           | Renders `login` form view.                                   |                                                          |
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { username, password }                                      |
| `GET`      | `/signup`                          | Renders `signup` form view.                                  |                                                          |
| `POST`     | `/signup`                          | Sends Sign Up info to the server and creates user in the DB. | {  username, password  }                                    |
| `GET`      | `/private/edit-profile`            | Private route. Renders `edit-profile` form view.             |                                                          |
| `PUT`      | `/private/edit-profile`            | Private route. Sends edit-profile info to server and updates user in DB. | { username, password, [firstName], [lastName], [imageUrl] } |
| `GET`      | `/private/favorites`               | Private route. Render the `favorites` view.                  |                                                          |
| `POST`     | `/private/favorites/`              | Private route. Adds a new favorite for the current user.     | { songName, artist, album, songUrl }                                 |
| `DELETE`   | `/private/favorites/:songId` | Private route. Deletes the existing favorite from the current user. |                                                          |
| `GET`      | `/artistList`                     | Renders `artist-list` view.                              |                                                          |
| `GET`      | `/artistList/:artistId`         | Renders `artist-list-albums` view for the particular artist. |                                                          |
| `GET`      | `/artistList/:artistId/:albumId`         | Renders `albums-list-songs` view for the particular album. |                                                          |
| `POST`      | `/artistList/:artistId/:albumId/:songId`         | Sends favorite song to favorite list OR song comment to comment list. + redirects to profile |                                                          |







## Models

User model

```javascript
{
  name: String,
  username: String,
  password: String,
  favorites: [FavoriteId],
  comments: String
}

```


Favorites model

```javascript
{
  songId: String,

}

```

Comments model **after MVP**

```javascript
{
  songId: String,
  comment: String
  
}

```



<br>

## API's
SpotifyWebApi 

<br>


## Packages
Package JSON
npm packages 
express
express-session 
mongoose
handlebars 
middleware 


<br>



## Backlog

[See the Trello board.](https://trello.com/b/ZySTWtTc/spotify-friends)



<br>



## Links



### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Guglielmo123/spotify-friends)

[Deploy Link](n.a.)



<br>

## Colors 
(https://usbrandcolors.com/spotify-colors/)

Spotify Green: RGB:	30 215 96
Spotify Black: RGB:	25 20 20


### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1C_MynniXmOCdgxEZ_D9Usl6h5UWw_6paR3F2NT2nkgo/edit?usp=sharing)

### Contributors
Guglielmo Galasso - [`<github-username>`](https://gist.github.com/Guglielmo123) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/guglielmo-galasso/)

Victoria Avelar - [`<github-username>`](https://github.com/avelarvicky) - [`<linkedin-profile-link>`](https://www.linkedin.com/in/victoria-avelar-16b041275/)
