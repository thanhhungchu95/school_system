# School System Application
This is build on top of NestJS framework, using MySQL database. 
The application provide an API server to support the various needs of teachers in managing their students and classrooms

# Getting Started
## How to setup
### The necessary 
You will need to install these tool/program to use the software
- Required 
  - [Git - Source code management](https://git-scm.com/)
  - [Docker/Docker Desktop - Container application development](https://www.docker.com/)
  - A terminal application which suitable for you 
    - **Windows**: `PowerShell`, `Command Prompt` or `Windows Terminal`
    - **macOS**: builtin macOS `Terminal` or `iTerm`
    - **Linux**: `Gnome Terminal`, `Konsole`, `Xfce Terminal` or `Kitty`
  - An API Client tool of your choice
    - [Postman](https://www.postman.com/)
    - [Insomnia](https://insomnia.rest/)
    - [curl](https://curl.se/)
- Optional (use for Developement only)
  - [Node.JS - Cross platform, open source JavaScript runtime environment](https://nodejs.org/en)
  - [VSCode - Code editing/IDE](https://code.visualstudio.com/)
  - [DBeaver - Free universal Database Tool](https://dbeaver.io/)

### Before start
Firstly, you need to get the source code: 
```bash
git clone https://github.com/thanhhungchu95/school_system.git
cd school_system
```

> Ensure that you are in **school_system** project folder 

### Build the development environment

Copy the environment variable config file: 
```bash
cp .env.example .env
```
Then you can modify the necessary environment variable inside .env file

Install necessary packages: 
```bash
npm install -g yarn @nestjs/cli             # Use yarn to maintenance nodejs package
yarn install                                # Install the necessary package
```

Run mysql database server
```bash
docker compose --env-file .env up --detach school_system_db
```

Verify the database is up and running (Replace `rootpass` with your **$MYSQL_ROOT_PASSWORD** variable in .env file )
```bash
docker exec -it school_system_db sh -c "mysql -uroot -prootpass -e 'SELECT 1;'"
```

Run the migration and seed the initial data
```bash
yarn migrate:run:dev
yarn seed:dev
```

Run the API server
```bash
yarn start:dev
```
Now you can start to call API server at: [http://localhost:5000/](http://localhost:5000/), replace the port with your **$SCHOOL_SYSTEM_PORT** variable in `.env` file

### Build the production server
Copy the environment variable config file: 
```bash
cp .env.production.example .env.production.local
```
Then you can modify the necessary environment variable inside .env file

Run mysql database server and webapi server
```bash
docker compose --env-file .env.production.local up --detach --build
```

Production build will not come with initial data for now, you need to use **DBeaver** or other database tool.  
Then you can connect to the database with these credential (use your variable if you have changed the content of `.env.production.local` file before build the server)
- **Host**: localhost
- **Port**: 3306
- **Database**: schooldb
- **User**: schooluser
- **Password**: P@ssw0rd

Then you can run the sample script in source project folder `init_data.sql`

Now you can start to call API server at: [http://localhost:8080/](http://localhost:8080/)
