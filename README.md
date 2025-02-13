# School System Application

## Overview
The **School System Application** is built on the **NestJS** framework with a **MySQL** database. It provides an API server to support teachers in managing students and classrooms efficiently.

## Features
- User authentication and role management
- Student and teacher management
- Class scheduling and enrollment
- Database migration and seeding support
- RESTful API for external integrations

## Getting Started
### Prerequisites
Ensure you have the following tools installed:

#### Required:
- [Git](https://git-scm.com/) - Source code management
- [Docker/Docker Desktop](https://www.docker.com/) - Containerized environment
- A terminal application of your choice:
  - **Windows**: PowerShell, Command Prompt, or Windows Terminal
  - **macOS**: Terminal or iTerm
  - **Linux**: Gnome Terminal, Konsole, Xfce Terminal, or Kitty
- API client tool:
  - [Postman](https://www.postman.com/)
  - [Insomnia](https://insomnia.rest/)
  - [curl](https://curl.se/)

#### Optional (for development only):
- [Node.js](https://nodejs.org/en) - JavaScript runtime
- [VS Code](https://code.visualstudio.com/) - Code editor
- [DBeaver](https://dbeaver.io/) - Database management tool

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/thanhhungchu95/school_system.git
   cd school_system
   ```
2. Copy the environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install -g yarn @nestjs/cli
   yarn install
   ```
4. Start the MySQL database:
   ```bash
   docker compose --env-file .env up --detach school_system_db
   ```
5. Verify the database is running (replace `rootpass` with `$MYSQL_ROOT_PASSWORD` from `.env`):
   ```bash
   docker exec -it school_system_db sh -c "mysql -uroot -prootpass -e 'SELECT 1;'"
   ```
6. Run migrations and seed initial data:
   ```bash
   yarn migrate:run:dev
   yarn seed:dev
   ```
7. Start the API server:
   ```bash
   yarn start:dev
   ```
   The API server will be available at: [http://localhost:5000/](http://localhost:5000/) (or your `$SCHOOL_SYSTEM_PORT` value).

### Running in Production
1. Copy the production environment file:
   ```bash
   cp .env.production.example .env.production.local
   ```
2. Start the application:
   ```bash
   docker compose --env-file .env.production.local up --detach --build
   ```
3. Database credentials (update if modified in `.env.production.local`):
   - **Host**: localhost
   - **Port**: 3306
   - **Database**: schooldb
   - **User**: schooluser
   - **Password**: P@ssw0rd
4. (Optional) Initialize sample data using `init_data.sql`.
5. The production API server will be available at: [http://localhost:8080/](http://localhost:8080/).

## Contributing
We welcome contributions! Feel free to submit pull requests and report issues.

## License
This project is licensed under the MIT License.
