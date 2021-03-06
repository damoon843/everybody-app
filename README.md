# cs0320 Term Project 2021

**Team Members:**
Lauren Choi, Alex Guo, David Moon, Joshua Woo

**Team Strengths and Weaknesses:**

Lauren  
strengths: frontend  
weaknesses: backend, databases

Alex  
strengths: backend, databases  
weaknesses: frontend

David  
strengths: backend, databases  
weaknesses: frontend

Josh  
strengths: frontend  
weaknesses: backend, databases

### Idea 1: Travel Sidekick
**Premise:** Traveling is great! But it's sometimes hard to keep track of everything in one place, especially when you're visiting multiple stops. To solve this, we'd like to create a one-stop website to help travelers manage trips.

**Features**

- A page with flight information (boarding group, gate number, etc): transportation is a necessary part of traveling, so it'd be helpful to organize flight information in one place. Some possible challenges include accounting for delayed/cancelled flights and factoring in time zone differences.

- A page with lodging details (address, point of contact, room number if applicable): lodging is also a necessary part of traveling. The biggest challenge about this feature is pulling the location coordinates for hotels based on user-inputted addresses, since we'll be using the coordinates to generate sightseeing recommendations through k-nearest neighbors.

- A budgeting sheet to record expenses: this page will help users keep track of trip expenses. One anticipated challenge is accounting for different currencies and their exchange rates.

- A calendar to view/manage itineraries: the calendar will help users keep track of trip itineraries. Possible challenges include handling HTTP requests to update trips and multiple users concurrently editing the same calendar.

- Login page + registration: this feature will enable users to save their information. Some possible challenges include integrating login information with users' associated trip information, querying the database for user registration details, and hashing passwords.

**Algorithm:** The site could use the k-nearest neighbors algorithm to generate recommended points of interest.

**UPDATED ALGORITHM:** We could adapt the k-nearest neighbors algorithm to factor in user preferences (type of destination, event, recently visited, etc.) and return a list of nearest destinations using the Google Maps API. Then, the user could enter which locations they want to visit, and we could implement a minimum spanning tree with Prim's Algorithm to generate a route that hits all of their desired locations. To make this more complex, we could also rank the nearest destinations / routes based on previous preferences and/or recently visited destinations.

TA Approval (dlichen): Maybe, but probably rejected. The algorithm is not significantly complex.

### Idea 2: Workout Buddy
**Premise:** With the new circumstances brought about by COVID, going to the gym for a workout with weights is not as accessible as before. Hence, there has been a noticeable increase in consumption of simple guided bodyweight workouts, whether from user-uploaded videos on youtube or paid collections from a fitness organization. We'd like to design an app or website allowing easy access for registered users to create and upload bodyweight workouts, serving as a mobile platform to both find and share your favorite workouts.

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

### Idea 3: Coffee Chats
**Premise:** We all love coffee shops, and we all love study breaks! This app will randomly pair people at cafes for quick 5-10 minute coffee chats.

**Features:**

- Checking in: users will be able to "check in" to a cafe to let other users know they're available for chats. The biggest challenge of this feature is generating a user token -- since the app won't have a login system, the site will need to map users to an identifier for each session.

- Location: the app will also need to determine where users are located. One possible challenge of this feature is grouping users by location in live-time.

- Preferences: users could weight possible matches based on their preferences (eg. age). An anticipated challenge of this feature is calculating the weight for each preference before generating a random user.

- Validation: for safety purposes, we would have a validation system based on students' university emails. The main challenges of this feature are (1) using Regexes to identify educational email addresses, and (2) querying university email directories to validate email existence.

- Chatting: another feature would be putting matched users into a chat room to organize meeting logistics (where to meet, recognizing appearance, etc.) The main challenge of this feature is implementing a chatting function and hosting each chat.

**Algorithm:** the app would integrate an algorithm to weight user preferences before returning a match.

**UPDATED ALGORITHM:** First, we'd process drinks on a cafe-by-cafe basis to categorize each drink and build up a database. Then, once we've cleaned up the data, we can adapt the K-nearest neighbors where K=1 to match users who are most similar to each other. Each node in the KD tree would represent a user, and each dimension would represent characteristics about that user (age, drink order, etc.). Because the dimensions are words rather than integers, instead of using Euclidean/axis distance to recur down the KD tree, we'd utilize the Knuth-Morris-Pratt algorithm to determine how similar two dimensions are. In the case of drink orders, we'd use the drink data stored in the backend to look at overall similarities between categories. One anticipated challenge of this algorithm is updating the KD tree as users join the website.

TA Approval: Rejected because the algorithm is not complex enough.

Please resubmit before the end of the week either expanding upon existing ideas or making a new one.

**Mentor TA:** _Put your mentor TA's name and email here once you're assigned one!_

## Meetings
_On your first meeting with your mentor TA, you should plan dates for at least the following meetings:_

**Specs, Mockup, and Design Meeting:** _(Schedule for on or before March 15)_

**4-Way Checkpoint:** _(Schedule for on or before April 5)_

**Adversary Checkpoint:** _(Schedule for on or before April 12 once you are assigned an adversary TA)_

## How to Build and Run
_A necessary part of any README!_
