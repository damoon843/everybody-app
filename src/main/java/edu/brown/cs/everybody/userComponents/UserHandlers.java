package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.Main;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.*;

/**
 * Contains handler classes for user-related logic.
 */
public class UserHandlers {
  private static final Gson GSON = new Gson();

  /**
   * Handles requests made for user creation.
   */
  public static class NewUserHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      // Parse request from client
      String username = data.getString("username");
      String fName = data.getString("firstName");
      String lName = data.getString("lastName");
      String createdAt = data.getString("createdAt");
      // TODO: convert createdAt str to Date obj
      // TODO: add user preferences fields

      PostgresDatabase.insertUser(null);
      return null;
    }
  }

  public static class DeleteUserHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());


      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
  }

  /**
   * Handles requests made for home feed recommendations.
   */
  public static class GetRecommendationsHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      // TODO: filter out workouts which don't match preferences in the for loops


      JSONObject data = new JSONObject(request.body());
      // List of Workouts to return to frontend
      List<Map<String, String>> output = new ArrayList<>();

      // Parse request from client and extract user info
      int userID = Integer.parseInt(data.getString("userID"));
      AppUser user;
      if(Main.getUsers().containsKey(userID)) {
        user = Main.getUsers().get(userID);
      } else {
        user = PostgresDatabase.getUser(userID);
        // TODO: instead of checking for null, catch the exception
        if(user == null) {
          Map<String, Object> variables = ImmutableMap.of("error", "UserID Not Found.");
          return GSON.toJson(variables);
        }
      }

      // inserts 10 workouts from people user follows into finalSortedWorkouts
      PriorityQueue<Workout> finalSortedWorkouts = new PriorityQueue<>(new WorkoutComparator());
      int counter = 0;
      List<Integer> following = user.getFollowing();
      Collections.shuffle(following);
      for (int followingUserID : following) {
        if (counter == 10) {
          break;
        }
        AppUser followingUser = PostgresDatabase.getUser(followingUserID);
        // TODO: catch exceptions
        PriorityQueue<Workout> followingUserWorkouts = new PriorityQueue<>(new WorkoutComparator());
        if(followingUser.getWorkouts() != null) {
          followingUserWorkouts.addAll(followingUser.getWorkouts());
        }
        Workout recentPost = followingUserWorkouts.poll();
        while (recentPost != null) {
          if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId())) {
            user.addRecentlViewed(recentPost.getWorkoutId());
            finalSortedWorkouts.add(recentPost);
            counter++;
            break;
          } else {
            recentPost = followingUserWorkouts.poll();
          }
        }
      }

      // inserts 4 workouts from strongly connected users into output
      counter = 0;
      List<Integer> scc = user.getStronglyConnected();
      Collections.shuffle(scc);
      for (int connectedUserID : scc) {
        if (counter == 4) {
          break;
        }
        AppUser connectedUser = PostgresDatabase.getUser(connectedUserID);
        // TODO: catch exceptions
        PriorityQueue<Workout> connectedUserWorkouts = new PriorityQueue<>(new WorkoutComparator());
        if(connectedUser.getWorkouts() != null) {
          connectedUserWorkouts.addAll(connectedUser.getWorkouts());
        }
        Workout recentPost = connectedUserWorkouts.poll();
        while (recentPost != null) {
          if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId())) {
            user.addRecentlViewed(recentPost.getWorkoutId());
            finalSortedWorkouts.add(recentPost);
            counter++;
            break;
          } else {
            recentPost = connectedUserWorkouts.poll();
          }
        }
      }
      Workout finalWorkout = finalSortedWorkouts.poll();
      while (finalWorkout != null) {
        output.add(finalWorkout.toMap());
      }

      Map<String, Object> variables = ImmutableMap.of("output", output);
      return GSON.toJson(variables);
    }
  }
}
