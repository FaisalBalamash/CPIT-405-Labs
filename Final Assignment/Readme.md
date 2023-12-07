## Overview

This application enables users to manage their bookmarks by allowing them to create, read, update, and delete bookmarks. It features a React frontend and a PHP backend with a MySQL database.

## Frontend

### Components

- **App**: The root component that initializes the bookmark list and incorporates `BookmarkForm` and `BookmarkList` components.
- **BookmarkForm**: A form component to add new bookmarks.
- **BookmarkList**: Renders a list of `Bookmark` components.
- **Bookmark**: Displays individual bookmark details with options to update, delete, and share the bookmark on social media.

### Usage

1. **Adding a Bookmark**: Input the title and URL in the `BookmarkForm` and click submit.
2. **Updating a Bookmark**: Edit the URL in an existing bookmark and submit the change.
3. **Deleting a Bookmark**: Click the delete button on a bookmark you wish to remove.
4. **Sharing a Bookmark**: Use the social media icons to share bookmarks on Twitter, Facebook, or LinkedIn.

## Backend

### Endpoints

- **POST /api/create.php**: Endpoint to create a new bookmark.
- **GET /api/readAll.php**: Endpoint to retrieve all bookmarks.
- **DELETE /api/delete.php**: Endpoint to delete a bookmark by ID.
- **PUT /api/update.php**: Endpoint to update a bookmark by ID.

### Database

- Utilizes a MySQL database named `bookmarking_db`.
- Contains a table `bookmarks` with the fields: `id`, `title`, `link`, `date_added`.

### PHP Classes

- **Database**: Manages the database connection.
- **Bookmark**: Represents a bookmark and includes methods for CRUD operations.

## Installation

### Prerequisites

- PHP 7.4+
- MySQL 5.7+
- Node.js 12.0+

### Setup

1. Fork or clone the repository.
2. Install Node.js dependencies with `npm install`.
3. Create a MySQL database and import the provided `.sql` file.
4. Configure the database connection in the `Database` class.
5. Start the frontend development server with `npm start`.
6. Serve the PHP backend on a suitable server, like Apache or Nginx.

## Contributing

Follow these steps to contribute to the project:

1. Fork the repository.
2. Create a feature branch: `git checkout -b new-feature`.
3. Commit your changes: `git commit -am 'Add some feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Submit a pull request.
