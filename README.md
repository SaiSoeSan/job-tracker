# job-tracker

Job Tracker is a web application that allows users to track their job applications. It includes features for both the frontend and backend.

## Screenshot

![](https://github.com/SaiSoeSan/job-tracker/blob/main/screenshot/demo.gif)

## Features

### Frontend

- **User Authentication**: Users can register, log in, and log out.
- **Job List**: Users can view a list of their job applications.
- **Add Job**: Users can add new job applications.
- **Delete Job**: Users can delete job applications.
- **Search and Filter**: Users can search and filter job applications by company or job title.
- **Pagination**: Job applications are paginated for easy navigation.
- **Error Handling**: Error messages are displayed in a popup box.

### Backend

- **User Authentication**: User registration, login, and logout using Laravel Sanctum.
- **Job Management**: CRUD operations for job applications.
  - **Create Job**: Add a new job application.
  - **Read Job**: View job applications.
  - **Update Job**: Update job applications.
  - **Delete Job**: Soft delete job applications.
- **Database**: SQLite database for testing, MySQL for production.
- **API Endpoints**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Log in a user.
  - `POST /api/logout`: Log out a user.
  - `GET /api/myjobs`: List all job applications.
  - `POST /api/myjobs`: Create a new job application.
  - `GET /api/myjobs/{id}`: View a specific job application.
  - `PUT /api/myjobs/{id}`: Update a specific job application.
  - `DELETE /api/myjobs/{id}`: Delete a specific job application.
- **Testing**: PHPUnit tests for backend functionality.
- **Docker**: Docker support for easy setup and deployment.

## Installation

### Prerequisites

- PHP 8.x
- Composer
- Node.js
- npm or yarn
- Docker

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/SaiSoeSan/job-tracker.git
   cd job-tracker/backend
   cd job-tracker/frontend
   ```

### Running with Docker

1. Build and run the Docker containers for backend:

   ```sh
   cd job-tracker/backend
   docker compose build
   docker compose up
   ```

2. Build and run the Docker containers for frontend:

   ```sh
   cd job-tracker/frontend
   docker compose build
   docker compose up
   ```

3. Access the application:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:8080`

4. To stop the containers:
   ```sh
   docker-compose down
   ```
