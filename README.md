# RUNNING PROJECT MANUALLY

## Run Backend
1. Choose a directory, for example "tasks" in your HOME and download the project
```shell
~$ cd $HOME
~$ mkdir tasks
~$ cd tasks
tasks$ curl -L -O  https://github.com/piturriagit/tasks-docker/archive/main.tar.gz --output main.tar.gz
tasks$ tar xzvf main.tar.gz
tasks$ rm main.tar.gz 
tasks$ cd tasks-docker-main
tasks-docker-main$ ls -ltra
    drwxr-xr-x  13 patricia  staff  416 Jul 30 03:05 TasksWebApp-Frontend
    drwxr-xr-x   9 patricia  staff  288 Jul 30 03:05 TasksWebApp-Backend
    -rw-r--r--   1 patricia  staff   27 Jul 30 03:05 README.md
    ...
```
2. Install jdk 21
  * Download jdk 21 and extract it in your directory
```shell
tasks-docker-main$ curl https://download.oracle.com/java/21/latest/jdk-21_linux-aarch64_bin.tar.gz --output jdk-21_linux-aarch64_bin.tar.gz
tasks-docker-main$ sha256sum jdk-21_linux-aarch64_bin.tar.gz 
    708064ee3a1844245d83be483ff42cc9ca0c482886a98be7f889dff69ac77850  jdk-21_linux-aarch64_bin.tar.gz
tasks-docker-main$ curl https://download.oracle.com/java/21/latest/jdk-21_linux-aarch64_bin.tar.gz.sha256
    708064ee3a1844245d83be483ff42cc9ca0c482886a98be7f889dff69ac77850$
tasks-docker-main$ tar xzvf jdk-21_linux-aarch64_bin.tar.gz 
```
  * Add JDK21 to the JAVA_HOME
```shell
tasks-docker-main$ export JAVA_HOME=$(/usr/libexec/java_home -v 21)
tasks-docker-main$ echo $JAVA_HOME
    /Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
```
  * Check
```shell
tasks-docker-main$ java --version
    java 21.0.7 2025-04-15 LTS
    Java(TM) SE Runtime Environment (build 21.0.7+8-LTS-245)
    Java HotSpot(TM) 64-Bit Server VM (build 21.0.7+8-LTS-245, mixed mode, sharing)
```
2. Install maven
  * Download mvn and extract it in your directory
```shell
tasks-docker-main$ curl https://dlcdn.apache.org/maven/maven-3/3.9.11/binaries/apache-maven-3.9.11-bin.tar.gz --output apache-maven-3.9.11-bin.tar.gz
tasks-docker-main$ sha512sum apache-maven-3.9.11-bin.tar.gz                                                             
    bcfe4fe305c962ace56ac7b5fc7a08b87d5abd8b7e89027ab251069faebee516b0ded8961445d6d91ec1985dfe30f8153268843c89aa392733d1a3ec956c9978  apache-maven-3.9.11-bin.tar.gz
tasks-docker-main$ curl https://downloads.apache.org/maven/maven-3/3.9.11/binaries/apache-maven-3.9.11-bin.tar.gz.sha512
    bcfe4fe305c962ace56ac7b5fc7a08b87d5abd8b7e89027ab251069faebee516b0ded8961445d6d91ec1985dfe30f8153268843c89aa392733d1a3ec956c9978%
tasks-docker-main$ tar xzvf apache-maven-3.9.11-bin.tar.gz 
```
  * Add MVN to your HOME
```shell
tasks-docker-main$ echo $PATH
    <your current path>
tasks-docker-main$ export PATH="$PATH:`pwd`/apache-maven-3.9.11/bin"
tasks-docker-main$ echo $PATH
    <your current path>:<your current directory>/apache-maven-3.9.11/bin                                   
texto:/Users/patricia/Desktop/piturria/apache-maven-3.9.11/bin
```
  * Check
```shell
tasks-docker-main$ mvn --version                                   
Apache Maven 3.9.11 (3e54c93a704957b63ee3494413a2b544fd3d825b)
Maven home: /Users/patricia/Desktop/piturria/apache-maven-3.9.11
Java version: 21.0.7, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home
Default locale: en_ES, platform encoding: UTF-8
OS name: "mac os x", version: "15.5", arch: "aarch64", family: "mac"
```
4. Build the jar
  * optional prepare before build
```shell
tasks-docker-main$ cd TasksWebApp-Backend
TasksWebApp-Backend$ mvn clean
TasksWebApp-Backend$ mvn validate 
TasksWebApp-Backend$ mvn compile
TasksWebApp-Backend$ mvn test
TasksWebApp-Backend$ mvn package
TasksWebApp-Backend$ mvn verify
TasksWebApp-Backend$ ls target/MyTasks.v1.0.jar
    target/MyTasks.v1.0.jar
```
  * build the jar
```shell
TasksWebApp-Backend$ mvn package
TasksWebApp-Backend$ mvn verify
TasksWebApp-Backend$ ls target/MyTasks.v1.0.jar
    target/MyTasks.v1.0.jar
```
  * move it to your folder
```shell
TasksWebApp-Backend$ mv target/MyTasks.v1.0.jar ../..
TasksWebApp-Backend$ cd ../..
tasks$ ls
    MyTasks.v1.0.jar
```
6. Run the API
  * Run jar for default environment
```shell
tasks$ java -jar MyTasks.v1.0.jar com.piturria.TasksWebApp
...
2025-07-30T12:44:04.174+02:00  INFO 6272 --- [my_tasks_backend] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection conn0: url=jdbc:h2:mem:piturriadb user=DB
...
2025-07-30T12:44:04.942+02:00  INFO 6272 --- [my_tasks_backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
```
  * Use default credentials (test, test) for authentication in browser.
  * Access to the API with swagger: http://localhost:8080/swagger-ui/index.html
  * Access to the memory H2 database: http://localhost:8080/h2-console piturriadb (db,db1)
  * You can also access the api using postman.
  * The default configuration for the backend is:
    API_PORT=8080
    DB_URL=jdbc:h2:mem:piturriadb
    DB_USERNAME=db
    DB_PASSWORD=db1
    DB_DRIVER=org.h2.Driver
    DDL_AUTO=create
    SQL_ENABLE=true
  * There is default data in H2 piturriadb. User 'test' helps you to authenticate yourself while testing.
  
7. OR run the API for specific deployment. The supported environment variables and their default values are:
    API_PORT=8080
    DB_URL=jdbc:h2:mem:piturriadb
    DB_USERNAME=db
    DB_PASSWORD=db1
    DB_DRIVER=org.h2.Driver
    DDL_AUTO=create
    SQL_ENABLE=true
  * Check your db is running in your pc. For example, for mysql:
```shell
tasks$ mysqlsh user@localhost:3306/tasksdb
    Please provide the password for 'user@localhost:3306': password 
    Save password for 'root@localhost:3306'? [Y]es/[N]o/Ne[v]er (default No): 
      MySQL Shell 9.2.0
mysql tasksdb> show tables;
mysql tasksdb> \q
```
  * Run the API for your environment, for example:
```shell
tasks$ java -DAPI_PORT="8081" -DDB_URL="jdbc:mysql://localhost:3306/tasksdb?createDatabaseIfNotExist=true&serverTimezone=UTC" -DDB_USERNAME="user" -DDB_PASSWORD="password" -DDB_DRIVER="com.mysql.cj.jdbc.Driver" -DDDL_AUTO="update" -DDATA_LOAD="false" -DSQL_ENABLE="true" -jar MyTasks.v1.0.jar com.piturria.TasksWebApp
2025-07-30T15:07:00.890+02:00  INFO 13112 --- [my_tasks_backend] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8081 (http) with context path '/'
2025-07-30T15:07:00.901+02:00  INFO 13112 --- [my_tasks_backend] [           main] c.p.TasksWebApp.TasksWebAppApplication   : Started TasksWebAppApplication in 1.894 seconds (process running for 2.098)
```
  * First time, the backend would generate some fake data in users and tasks:
```sql
INSERT INTO tasks (title, description, creation_date) VALUES
  ('Task1', 'Description1', NOW())      --today
 ,('Task2', 'Description2', NOW()+1)    --tomorrow
 ,('Task3', 'Description3', NOW()-1)    --yesterday
 ,('TaskEmpty', null, NOW())             --null values
 ,('TaskLong with very long title',
 'Description3 with very long description as you need to perform all of the expected actions',
 NOW()+3650)    --long values: long strings, in 10 years
 ,('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i', NOW())
;
INSERT INTO users (username, password) VALUES
  ('admin' , '$2a$12$TiyjrVY6gZHKr7dUvgRF2u4Xdtm0hQiFmv5l/2OVJlmHNDLRxR3Fe') --a@123
 ,('user'  , '$2a$12$EQBZh8dzPqTvS2EvlEmYD.wmIJZCTEvAvunKmuT30OZWdGBXGE14K') --u@123
 ,('ana'   , '$2a$12$2iNWo1B7pgrJdIb7x.RT6Oz.6ot9PO7s49OFbkZrevBEJIX6l7pEu') --a@123
 ,('bea'   , '$2a$12$J.4eZljF6XHtsD.ZHmH/p.ftBhV/ZeKJW3.LmnvltLdR4v39P9Ui2') --b@123
 ,('carlos', '$2a$12$eXIEjFm9ixXYMJJmoOWusO1ck8Fao3cERNOdgqd31.Y0i4CXhzEZi') --c@123
 ,('test'  , '$2a$12$syzYVNnw8RybZLPHras5mupGLnPrqUqep7hKCOoPqsIGZkRsSD4bi') --test
;
```
  * In case your database is empty, you can use the api to generate the first user via command line:
```shell
tasks$ curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "apiuser", "password": "apiuser1"}' http://localhost:8081/auth/register
    HTTP/1.1 200 
    Vary: Origin
    Vary: Access-Control-Request-Method
    Vary: Access-Control-Request-Headers
    X-Content-Type-Options: nosniff
    X-XSS-Protection: 0
    Cache-Control: no-cache, no-store, max-age=0, must-revalidate
    Pragma: no-cache
    Expires: 0
    X-Frame-Options: SAMEORIGIN
    Content-Type: application/json
    Transfer-Encoding: chunked
    Date: Wed, 30 Jul 2025 13:36:52 GMT
    
    {"username":
      "apiuser",
      "jwt":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGl1c2VyIiwiaWF0IjoxNzUzODgyNjEyLCJleHAiOjE3NTYwNDI2MTJ9.c2BpnVKsQo59setykcQojUvow34eIFbqppqUZXCQPqk",
      "expiration":"2025-08-24T13:36:52.000+00:00"
    }$
```
* You can use the jwt in the response to authenticate for next requests before expiration, for example:
```shell
$ curl -i -X GET -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcGl1c2VyIiwiaWF0IjoxNzUzODgyNjEyLCJleHAiOjE3NTYwNDI2MTJ9.c2BpnVKsQo59setykcQojUvow34eIFbqppqUZXCQPqk' -H 'Content-Type: application/json' http://localhost:8080/api/tasks
    HTTP/1.1 200 
    Vary: Origin
    Vary: Access-Control-Request-Method
    Vary: Access-Control-Request-Headers
    X-Content-Type-Options: nosniff
    X-XSS-Protection: 0
    Cache-Control: no-cache, no-store, max-age=0, must-revalidate
    Pragma: no-cache
    Expires: 0
    X-Frame-Options: SAMEORIGIN
    Content-Type: application/json
    Transfer-Encoding: chunked
    Date: Wed, 30 Jul 2025 13:47:12 GMT

    [
      {"id":24,"title":"task1","description":"","creationDate":"2025-07-30T01:31:19.451201"},
      {"id":25,"title":"asdf","description":"asdf","creationDate":"2025-07-30T01:31:54.587815"},
      {"id":26,"title":"new task","description":"","creationDate":"2025-07-30T01:36:26.190317"}
    ]$     
```
* You can also provide the first user and password in database, but with the password encoded (HS256 with the SECRET_KEY).

## Prepare Frontend
1. Install nodejs and npm. 
  * You can use a For mac you can use Node Version Manager: https://www.nodejs.tech/es/download/package-manager#nvm
    * For mac this will be:
```shell
tasks$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
tasks$ \. "$HOME/.nvm/nvm.sh"
tasks$ nvm install 22
tasks$ node --version
v22.17.1
tasks$ nvm current
v22.17.1
tasks$ npm -v
11.4.2
```
2. Run frontend for default environment
  * run angular
```shell
tasks$ cd tasks-docker-main
tasks-docker-main$ cd TasksWebApp-Frontend
TasksWebApp-Frontend$ npm install
TasksWebApp-Frontend$ ng serve
    Initial chunk files | Names         |  Raw size
    main.js             | main          |  91.36 kB | 
    styles.css          | styles        | 764 bytes | 
    polyfills.js        | polyfills     |  95 bytes | 
    
                        | Initial total |  92.22 kB
    
    Application bundle generation complete. [0.819 seconds]
    
    Watch mode enabled. Watching for file changes...
    NOTE: Raw file sizes do not reflect development server per-request transformations.
      ➜  Local:   http://localhost:4200/
      ➜  press h + enter to show help
```
  * Access the frontend in: http://localhost:4200/
  * By default it will redirects to login
  * Once logged, authentication information will be sotred as "loginData" in your browser (local storage) so you won't need to authenticate again in that browser until JWT expires.

## Run Frontend
3. Run frontend for specific deployment port
```shell
TasksWebApp-Frontend$ ng serve --port 4201
Initial chunk files | Names         |  Raw size
main.js             | main          |  91.36 kB | 
styles.css          | styles        | 764 bytes | 
polyfills.js        | polyfills     |  95 bytes | 

                    | Initial total |  92.22 kB

Application bundle generation complete. [0.798 seconds]

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4201/
  ➜  press h + enter to show help
^C
```
  * Access the frontend in the configured port: http://localhost:4201/

# Not sure yet (wokring on it...)
## Integrates frontend inside the backend
  * Build
```shell
TasksWebApp-Frontend$ npm install                                                                    
    npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
    npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
    npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
    
    added 670 packages, and audited 671 packages in 3s
    
    118 packages are looking for funding
      run `npm fund` for details
    
    found 0 vulnerabilities
TasksWebApp-Frontend$ npm run build
    
    > tasks-frontend@0.0.0 build
    > ng build
        
        Initial chunk files   | Names         |  Raw size | Estimated transfer size
        main-F7EZYBOQ.js      | main          | 305.12 kB |                79.25 kB
        polyfills-B6TNHZQ6.js | polyfills     |  34.58 kB |                11.32 kB
        styles-YDFAKOAP.css   | styles        | 542 bytes |               542 bytes
        
                              | Initial total | 340.24 kB |                91.11 kB
    
    Application bundle generation complete. [2.186 seconds]
    
    Output location: /Users/patricia/tasks/tasks-docker-main/TasksWebApp-Frontend/dist/tasks-frontend
TasksWebApp-Frontend$ ls -ltra dist/tasks-frontend 
    total 48
    drwxr-xr-x@  3 patricia  staff     96 Jul 30 16:33 ..
    drwxr-xr-x@  5 patricia  staff    160 Jul 30 16:33 .
    -rw-r--r--@  1 patricia  staff     18 Jul 30 16:33 prerendered-routes.json
    -rw-r--r--@  1 patricia  staff  19401 Jul 30 16:33 3rdpartylicenses.txt
    drwxr-xr-x@ 22 patricia  staff    704 Jul 30 16:33 browser
```

## Run app in docker
1. Install docker and run it (i am using desktop version)
* For example, for mac https://docs.docker.com/desktop/setup/install/mac-install/
```shell
~$ cd tasks
tasks$ cd tasks-docker-main
tasks-docker-main$ docker-compose --version
Docker Compose version v2.38.2-desktop.1
```
2. Check Dockerfile in Frontend
```shell
tasks$ cd tasks-docker-main
tasks-docker-main$ cat TasksWebApp-Frontend/Dockerfile
```
3. Check Dockerfile in Backend
```shell
tasks$ cd tasks-docker-main
tasks-docker-main$ cat TasksWebApp-Backend/Dockerfile
```
4. Configure docker-compose.yml to fit your environment needs (free ports in your computer, services in lowercase!!!)
```shell
tasks-docker-main$ cat docker-compose.yml
    services:
      my_tasks_backend:
        build: ./TasksWebApp-Backend
        mem_limit: 1024m
        ports:
          - "8080:8080"
        environment:
          DB_URL : jdbc:mysql://mysqldb:3306/DB_MYTASKS?createDatabaseIfNotExist=true&serverTimezone=UTC
          DB_USERNAME : docker
          DB_PASSWORD : secret.docker1
          DB_DRIVER : com.mysql.cj.jdbc.Driver
          DDL_AUTO : update
          DATA_LOAD : false
          SQL_ENABLE : true
        restart: always
        depends_on:
          mysqldb:
            condition: service_healthy
      mysqldb:
        image: mysql:9.2.0
        ports:
          - 3306:3306
        environment:
          MYSQL_ROOT_PASSWORD: secret.root1
          MYSQL_PASSWORD: secret.docker1
          MYSQL_USER: docker
          MYSQL_DATABASE: DB_MYTASKS
        restart: always
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
          timeout: 10s
          retries: 10
      my_tasks_frontend:
        build: ./tasks-frontend
        ports:
          - 4200:4200
```
5. Build docker with images for frontend, backend and mysql
* build the images and check them
```shell
tasks-docker-main$ docker-compose build
tasks-docker-main$ docker images
    REPOSITORY                      TAG       IMAGE ID       CREATED         SIZE
    tasks-frontend                  latest    fa935ec69ef3   5 minutes ago   38.9MB
    taskswebapp-my_tasks_backend    latest    596c5550d796   3 hours ago     838MB
    mysql                           9.2.0     0596fa224cdf   6 months ago    1.1GB
```
6. Run docker
```shell
tasks-docker-main$ docker-compose up
tasks-docker-main$ docker ps
[patricia@192.168.32.21:TasksWebApp2 (docker)]% docker ps
    CONTAINER ID   IMAGE                                  COMMAND                  CREATED       STATUS       PORTS                                         NAMES
    973bd0bee6a3   taskswebapp-my_tasks_frontend:latest   "docker-entrypoint.s…"   3 hours ago   Up 3 hours                                                 distracted_mcnulty
    1a6b4c0ba548   taskswebapp-my_tasks_frontend          "docker-entrypoint.s…"   3 hours ago   Up 3 hours   0.0.0.0:4200->4200/tcp, [::]:4200->4200/tcp   taskswebapp-my_tasks_frontend-1
```
7. If you need to forcefully clean ALL
```shell
tasks-docker-main$ docker ps -q
tasks-docker-main$ docker ps --filter=status=exited --filter=status=created -q
tasks-docker-main$ docker images -a --filter=dangling=true -q
tasks-docker-main$ docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] y
Deleted build cache objects:
...
tasks-docker-main$ docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them
  - all build cache

Are you sure you want to continue? [y/N] y
...
tasks-docker-main$ docker builder prune
WARNING! This will remove all dangling build cache. Are you sure you want to continue? [y/N] y
...
```