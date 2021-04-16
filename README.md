# CS0320 Term Project 2021: EveryBODY App

**Team Members:**
Lauren Choi (@lauren-choi), Alex Guo (@aguo71), David Moon (@damoon843), Joshua Woo (@jwoo153)

**App Overview:** With the new circumstances brought about by COVID, going to the gym for a workout with weights is not as accessible as before. Hence, there has been a noticeable increase in consumption of simple guided bodyweight workouts, whether from user-uploaded videos on youtube or paid collections from a fitness organization. We'd like to design an app or website allowing easy access for registered users to create and upload bodyweight workouts, serving as a mobile platform to both find and share your favorite workouts.

**Features:**

- Home feed: this page will randomly display recent workouts posted by people you follow. The main challenge of this feature is filtering out workouts that users have already seen, as well as pulling a small subset of data (people you follow) from a large dataset (all users).

- Exercises: this page will continue a compilation of all exercises (separate from full workouts). Some possible challenges include filtering exercises by user queries and embedding workout videos.

- Page to upload workouts: this page will allow users to upload custom workouts. One anticipated challenge about this feature is validating user inputs (eg. file size, file type, required fields) and modeling the data for each workout.

- Workout playlists: this page allows users to compile exercises to create a custom "workout playlist." The biggest challenge of this feature is handling the order of exercises in the playlist (eg. changing the order from jumping jacks -> squats to squats -> jumping jacks).

- Login page + registration: this feature will enable users to save their workout information. Some possible challenges include mapping login details to users' data, querying the database for user registration details, and hashing passwords.

**Algorithm:** we'd need to develop an algorithm to choose which workouts to display on the home page. The algorithm would factor in workout recency, user preferences, and the workout poster.

**UPDATED ALGORITHM**: We could develop a "for you"/recommendations page based on Kosaraju's algorithm to determine which workout posters are most relevant to the user. This will allow the user to engage with people who they aren't necessarily following, but are strongly connected to in the graph. We could also weight the graph based on recency, past interactions with other content, user profile information (HIIT, crossfit, bodybuilding, etc).

Another idea: since each workout is a combination of exercises, we could develop a workout generator based on a categorical decision tree that creates exercise combinations based on user preferences -- for example, length of workout, type of exercise, and similarity to other workouts. We could also develop an algorithm to generate week-long workout plans; this would factor in time on a macro level, since we'd have to evenly distribute workout types across each day.

TA Approval (dlichen): Maybe if you added a more significant algorithm -> maybe generating workouts under certain constraints? Currently the algorithm is not complex enough.

## How to Build and Run
_A necessary part of any README!_
