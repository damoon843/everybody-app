package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import org.json.JSONException;
import org.json.JSONObject;
import spark.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
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
    public Object handle(Request request, Response response) throws JSONException {
      JSONObject data = new JSONObject(request.body());

      // Parse request from client
      String fName = data.getString("firstName");
      String lName = data.getString("lastName");
      String username = data.getString("username");
      String password = data.getString("password");
      String workoutType = data.getString("workoutType");
      String workoutDuration = data.getString("workoutDuration");

      Integer duration = Integer.parseInt(workoutDuration);
      List<Object> listData = new ArrayList<>(Arrays.asList(fName, lName, username, password, workoutType, duration));
      Map<String, Object> variables;

      try {
        PostgresDatabase.insertUser(listData);

        // Query execute properly, encode session ID in cookie
        Session session = request.session(true);
        response.cookie("sessionID", request.session().id());

        // Set session attributes
        request.session().attribute("username", username);

        variables = ImmutableMap.of("queryStatus", "success");
      } catch (SQLException | URISyntaxException e) {
        // Query failed to execute
        variables = ImmutableMap.of("queryStatus", e.getMessage());
      }
      return GSON.toJson(variables);
    }
  }

  // TODO: FINISH
  public static class DeleteUserHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());


      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
  }

  public static class GetUserInfoHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String username = data.getString("username");

      List<Object> userInfo = PostgresDatabase.getUserInfo(username);

      Map<String, Object> variables = ImmutableMap.of("firstName", userInfo.get(0), "lastName", userInfo.get(1),
        "workoutType", userInfo.get(2), "workoutDuration", userInfo.get(3));


      return GSON.toJson(variables);
    }
  }

  /**
   * Handles requests made for home feed recommendations.
   */
  public static class GetRecommendationsHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      // TODO: filter out workouts which don't match preferences in the for loop
      JSONObject data = new JSONObject(request.body());
      // List of Workouts to return to frontend
      List<Map<String, String>> output = new ArrayList<>();

      // Parse request from client and extract user info
      String username = data.getString("username");
      // TODO DELETE
      username = "ntim";
      AppUser user;
      try {
        int userid = PostgresDatabase.getUserID(username);
        user = PostgresDatabase.getUser(userid);
      } catch (Exception e) {
        Map<String, Object> variables = ImmutableMap.of("error", "User Not Found.");
        return GSON.toJson(variables);
      }

      // inserts 10 workouts from people user follows into finalSortedWorkouts
      PriorityQueue<Workout> finalSortedWorkouts = new PriorityQueue<>(new WorkoutComparator());
      int counter = 0;
      List<Integer> following = user.getFollowing();
      if (!following.isEmpty()) {
        Collections.shuffle(following);
        for (int followingUserID : following) {
          if (counter == 10) {
            break;
          }
          AppUser followingUser = PostgresDatabase.getUser(followingUserID);
          // TODO: catch exceptions
          PriorityQueue<Workout> followingUserWorkouts = new PriorityQueue<>(new WorkoutComparator());
          if (followingUser.getWorkouts() != null) {
            followingUserWorkouts.addAll(followingUser.getWorkouts());
          }
          Workout recentPost = followingUserWorkouts.poll();
          while (recentPost != null) {
            if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId())) {
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
      counter = 0;
      List<Integer> scc = user.getStronglyConnected();
      if (!scc.isEmpty()) {
        Collections.shuffle(scc);
        for (int connectedUserID : scc) {
          if (counter == 4) {
            break;
          }
          AppUser connectedUser = PostgresDatabase.getUser(connectedUserID);
          // TODO: catch exceptions
          PriorityQueue<Workout> connectedUserWorkouts = new PriorityQueue<>(new WorkoutComparator());
          if (connectedUser.getWorkouts() != null) {
            connectedUserWorkouts.addAll(connectedUser.getWorkouts());
          }
          Workout recentPost = connectedUserWorkouts.poll();
          while (recentPost != null) {
            if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId())) {
              user.addRecentlyViewed(recentPost.getWorkoutId());
              finalSortedWorkouts.add(recentPost);
              counter++;
              break;
            } else {
              recentPost = connectedUserWorkouts.poll();
            }
          }
        }
      }

      Workout finalWorkout = finalSortedWorkouts.poll();
      while (finalWorkout != null) {
        output.add(finalWorkout.toMap());
        finalWorkout = finalSortedWorkouts.poll();
      }
      Map<String, Object> variables = ImmutableMap.of("workouts", output);
      System.out.println(output);
      return GSON.toJson(variables);
    }
  }

  /**
   * Handles requests made for a new follow relation.
   */
  public static class FollowHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String username = data.getString("user");
      String following = data.getString("following");

      System.out.println(request.cookies());
      Session session = request.session(false);
      System.out.println(session);

      if (session != null) {
        // Session retrieved, get username
        System.out.println((char[]) session.attribute("username"));
      }

      PostgresDatabase.insertFollow(username, following);
      Map<String, Object> variables = ImmutableMap.of("isValid", true);
      return GSON.toJson(variables);
    }
  }

  /**
   * Handles request made to unfollow a user.
   */
  public static class UnfollowHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String username = data.getString("user");
      String following = data.getString("following");
      PostgresDatabase.removeFollow(username, following);

      return null;
    }
  }

  /**
   * Handles user login.
   */
  public static class LoginHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String username = data.getString("username");
      String password = data.getString("password");
      Map<String, Object> variables = null;

      try {
        int output = PostgresDatabase.loginUser(username, password);

        // Query execution success
        if (output == 1) {
          // Login success -> create new session and set response cookie
          Session session = request.session(true);
          request.session().attribute("username", username);
          response.cookie(".localhost:3000.", "/", "sessionID", request.session().id(), 3600, false, false);
          variables = ImmutableMap.of("queryStatus", "success", "loginStatus", "success");
        } else {
          // Login failed
          variables = ImmutableMap.of("queryStatus", "success", "loginStatus", "failed");
        }
      } catch (SQLException ex) {
        // Query execution failed
        variables = ImmutableMap.of("queryStatus", ex.getMessage(), "loginStatus", "failed");
      }
      return GSON.toJson(variables);
    }
  }
}

