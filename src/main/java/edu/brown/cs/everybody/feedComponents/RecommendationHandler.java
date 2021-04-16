package edu.brown.cs.everybody.feedComponents;
import com.google.gson.Gson;
import com.google.common.collect.ImmutableMap;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.userComponents.AppUser;
import edu.brown.cs.everybody.utils.ErrorConstants;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Session;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * Handles recommendations and call to Kosaraju's.
 */
public class RecommendationHandler {
  private static final Gson GSON = new Gson();

  /**
   * Static class which handles the getRecommendations post request.
   */
  public static class Handler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      String username = "";
      AppUser user;
      Map<String, Object> variables;

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }
      if (username.equals("")) {
        System.out.println(ErrorConstants.ERROR_SESSION_USERNAME);
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_SESSION_USERNAME);
        return GSON.toJson(variables);
      }
      try {
        int userid = PostgresDatabase.getUserID(username);
        user = PostgresDatabase.getUser(userid);
      } catch (Exception e) {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_USERID);
        return GSON.toJson(variables);
      }

      // Determine workout duration range
      int lowBoundDuration;
      int highBoundDuration;
      if (user.getWorkoutDuration() == 0) {
        // bounds in seconds
        lowBoundDuration = 0;
        highBoundDuration = 1800;
      } else if (user.getWorkoutDuration() == 1) {
        lowBoundDuration = 1800;
        highBoundDuration = 3600;
      } else {
        lowBoundDuration = 3600;
        highBoundDuration = Integer.MAX_VALUE;
      }

      // TODO: INCORPORATE THIS
      String tagPreference = user.getWorkoutType();

      // inserts 6 workouts from people user follows into finalSortedWorkouts
      PriorityQueue<Workout> finalSortedWorkouts = new PriorityQueue<>(new WorkoutComparator());
      int counter = 0;
      List<Integer> following = user.getFollowing();
      if (!following.isEmpty()) {
        Collections.shuffle(following);
        for (int followingUserID : following) {
          if (counter == 6) {
            break;
          }
          AppUser followingUser;
          try {
            followingUser = PostgresDatabase.getUser(followingUserID);
          } catch (Exception e) {
            response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_USER);
            return GSON.toJson(variables);
          }
          PriorityQueue<Workout> followingUserWorkouts;
          if (followingUser.getWorkouts() != null) {
            followingUserWorkouts = followingUser.getWorkouts();
          } else {
            followingUserWorkouts = new PriorityQueue<>();
          }
          Workout recentPost = followingUserWorkouts.poll();

          while (recentPost != null) {
            if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId()) &&
                (recentPost.getDuration() >= lowBoundDuration && recentPost.getDuration() <= highBoundDuration)) {
              user.addRecentlyViewed(recentPost.getWorkoutId());
              finalSortedWorkouts.add(recentPost);
              counter++;
              break;
            } else {
              recentPost = followingUserWorkouts.poll();
            }
          }
        }
      }

      // inserts 4 workouts from strongly connected users into output
      int counter2 = 0;
      List<Integer> scc = user.getStronglyConnected();
      scc.remove(Integer.valueOf(user.getUserID()));
      if (!scc.isEmpty()) {
        Collections.shuffle(scc);
        for (int connectedUserID : scc) {
          if (counter2 == 4) {
            break;
          }
          AppUser connectedUser;
          try {
            connectedUser = PostgresDatabase.getUser(connectedUserID);
          } catch (Exception e) {
            response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_USER);
            return GSON.toJson(variables);
          }
          PriorityQueue<Workout> connectedUserWorkouts;
          if (connectedUser.getWorkouts() != null) {
            connectedUserWorkouts = connectedUser.getWorkouts();
          } else {
            connectedUserWorkouts = new PriorityQueue<>();
          }
          Workout recentPost = connectedUserWorkouts.poll();
          while (recentPost != null) {
            if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId()) &&
                (recentPost.getDuration() >= lowBoundDuration && recentPost.getDuration() <= highBoundDuration)) {
              user.addRecentlyViewed(recentPost.getWorkoutId());
              finalSortedWorkouts.add(recentPost);
              counter2++;
              break;
            } else {
              recentPost = connectedUserWorkouts.poll();
            }
          }
        }
      }

      // Gets additional workouts if needed to reach 14 total workouts
      // (so minimum of 4 community workouts are added)
      int additionalWorkoutsNeeded = 14 - (counter + counter2);
      PriorityQueue<Workout> additionalWorkouts;

      while (additionalWorkoutsNeeded > 0) {
        try {
          additionalWorkouts = PostgresDatabase.getAdditionalWorkouts(
              additionalWorkoutsNeeded + 5, user.getUserID());
          Workout recentPost = additionalWorkouts.poll();
          while (recentPost != null) {
            if (additionalWorkoutsNeeded <= 0) {
              break;
            } else if (recentPost.getDuration() >= lowBoundDuration && recentPost.getDuration() <= highBoundDuration) {
              user.addRecentlyViewed(recentPost.getWorkoutId());
              finalSortedWorkouts.add(recentPost);
              additionalWorkoutsNeeded--;
              recentPost = additionalWorkouts.poll();
            } else {
              recentPost = additionalWorkouts.poll();
            }
          }
        } catch (Exception e) {
          response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
          variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_ADDWORKOUTS);
          return GSON.toJson(variables);
        }
      }

      // List of Workouts to return to frontend
      List<Map<String, String>> output = new ArrayList<>();
      Workout finalWorkout = finalSortedWorkouts.poll();
      while (finalWorkout != null) {
        Map<String, String> wkout = finalWorkout.toMap();
        try {
          wkout.put("following", PostgresDatabase.getFollowingRelation(user.getUserID(), finalWorkout.getUsername()));
        } catch (Exception ex) {
            System.out.println(ErrorConstants.ERROR_DATABASE_QUERY);
            response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            variables = ImmutableMap.of("error", ErrorConstants.ERROR_DATABASE_QUERY);
            return GSON.toJson(variables);
        }
        output.add(wkout);
        finalWorkout = finalSortedWorkouts.poll();
      }
      variables = ImmutableMap.of("workouts", output);
      return GSON.toJson(variables);
    }
  }
}

