# CS0320 Term Project 2021: EveryBODY App
![](everBODY_logo.png)

**Team Members:**
Lauren Choi (@lauren-choi), Alex Guo (@aguo71), David Moon (@damoon843), Joshua Woo (@jwoo153)

**App Overview:** With the new circumstances brought about by COVID-19, going to the gym for a workout with weights is not as accessible as before. Hence, there has been a noticeable increase in consumption of simple guided bodyweight workouts (strength or cardio-related), whether from user-uploaded videos on youtube or paid collections from a fitness organization. EveryBODY is the fitness social media app for all, by all, serving as a mobile platform to share and view other users' bodyweight workouts.

**Final Presentation:** A link to the final product presentation can be found [here](https://docs.google.com/presentation/d/1__YhvloPYGBAoIf8TNcaFXsW2IOT7QlMt8n_5kbyh5w/edit#slide=id.gd2a99047a1_0_10).

**Key Features:**

- Account Creation page: serving as the sign-up/log-in page, this page allows users to either log-in to an existing account or sign-up for a new account.

- Recommended 'For You' page: serving as the home page of the application, this page uses Kosarajus's algorithm (explained further below) to determine strongly-connected components for a given logged-in user. 

- Creation page: also residing on the home page, this feature allows users to create exercises and workouts. Workout creation allows users to select from a public pool of exercises uploaded by all users, resulting in a 'playlist' of exercises. 

- Discover Exercises page: this page displays exercises posted by all users of the everyBODY app, allowing users to filter by workout type and body part (for strength exercises).

- My Profile page: this page displays information about a logged-in user, displaying a user's uploaded workouts and liked workouts. The user's workout preferences are also displayed here. The profile page contains functionality to delete all references of a user in the database.

**Backend:** TODO: fill this out.

**Frontend:** TODO: fill this out.

**Algorithm:** TODO: fill this out.

**Deployment** App deployment involved the following key services:

- Heroku: this was the core service used to deploy and scale the app under a unique domain name. Heroku provides dynos (application containers) in a fully-managed runtime environment

- Docker: this was used to build Docker images on Heroku's deployment process. Images provide pre-configured environemnts that are ensured to work in development and production-level environments.

- PostgreSQL Database: this was the relational database management system (RDBMS) used to store all relational data and structure the database schema. This Postgres DB is hosted on Heroku provisioned as an add-on to the app.

## How to Build and Run
Note that the following commands are meant to be run in a development/testing context; the production-level app is deployed at (INSERT URL HERE).  

To compile the source code of this project:
```
mvn compile
```
To compile and package code:
```
mvn package
```
To run the test suite:
```
mvn test
```
To run the frontend/client:
```
npm install
npm start
```
