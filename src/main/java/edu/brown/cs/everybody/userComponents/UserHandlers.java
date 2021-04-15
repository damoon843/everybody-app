package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.ErrorConstants;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import org.json.JSONException;
import org.json.JSONObject;
import spark.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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

        // Sign-up success -> create new session and set response cookie
        Session session = request.session(true);
        request.session().attribute("username", username);
        response.cookie(".localhost:3000.", "/", "sessionID", request.session().id(), 3600, false, false);
        variables = ImmutableMap.of("queryStatus", "success");
      } catch (SQLException | URISyntaxException e) {
        // Query failed to execute
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_INSERT_USER);
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
      String username;
      Map<String, Object> variables;
      List<Object> userInfo;

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
      if(username.equals("")) {
        System.out.println(ErrorConstants.ERROR_SESSION_USERNAME);
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_SESSION_USERNAME);
        return GSON.toJson(variables);
      }
      try {
        userInfo = PostgresDatabase.getUserInfo(username);
      } catch(SQLException ex) {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_USERINFO);
        return GSON.toJson(variables);
      }

      // Additional check to validate userInfo not empty
      if (userInfo.size() != 0) {
        variables = ImmutableMap.of("firstName", userInfo.get(0), "lastName", userInfo.get(1),
          "workoutType", userInfo.get(2), "workoutDuration", userInfo.get(3));
      } else {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_USERINFO);
        return GSON.toJson(variables);
      }
      return GSON.toJson(variables);
    }
  }

  /**
   * Handles requests made for home feed recommendations.
   */
  public static class GetRecommendationsHandler implements Route {
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
      if(username.equals("")) {
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
        lowBoundDuration = 0;
        highBoundDuration = 30;
      } else if (user.getWorkoutDuration() == 1) {
        lowBoundDuration = 30;
        highBoundDuration = 60;
      } else {
        lowBoundDuration = 60;
        highBoundDuration = Integer.MAX_VALUE;
      }

      // TODO: INCORPORATE THIS
      String tagPreference = user.getWorkoutType();

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

//      // Gets additional workouts if needed to reach 14 total workouts
//      int additionalWorkoutsNeeded = 14 - (counter + counter2);
//      PriorityQueue<Workout> additionalWorkouts;
//
//      // TODO: EDIT
//      while (additionalWorkoutsNeeded > 0) {
//        try {
//          additionalWorkouts = PostgresDatabase.getAdditionalWorkouts(additionalWorkoutsNeeded);
//          Workout recentPost = additionalWorkouts.poll();
//          if (!user.getRecentlyViewed().contains(recentPost.getWorkoutId()) &&
//              (recentPost.getDuration() >= lowBoundDuration && recentPost.getDuration() <= highBoundDuration)) {
//            user.addRecentlyViewed(recentPost.getWorkoutId());
//            finalSortedWorkouts.add(recentPost);
//            additionalWorkoutsNeeded --;
//          } else {
//            recentPost = additionalWorkouts.poll();
//          }
//        } catch (Exception e) {
//          response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
//          variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_ADDWORKOUTS);
//          return GSON.toJson(variables);
//        }
//      }

      // List of Workouts to return to frontend
      List<Map<String, String>> output = new ArrayList<>();
      Workout finalWorkout = finalSortedWorkouts.poll();
      while (finalWorkout != null) {
        output.add(finalWorkout.toMap());
        finalWorkout = finalSortedWorkouts.poll();
      }
      variables = ImmutableMap.of("workouts", output);
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
      String username = "";
      Map<String, Object> variables;
      String following = data.getString("following");

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }
      if(username.equals("")) {
        System.out.println(ErrorConstants.ERROR_SESSION_USERNAME);
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_SESSION_USERNAME);
        return GSON.toJson(variables);
      }
      try {
        PostgresDatabase.insertFollow(username, following);
      } catch(SQLException ex) {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_INSERT_FOLLOW);
        return GSON.toJson(variables);
      }
      variables = ImmutableMap.of("isValid", true);
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
      String username = "";
      Map<String, Object> variables;
      String following = data.getString("following");

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }
      if(username.equals("")) {
        System.out.println(ErrorConstants.ERROR_SESSION_USERNAME);
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_SESSION_USERNAME);
        return GSON.toJson(variables);
      }
      try {
        PostgresDatabase.removeFollow(username, following);
      } catch(SQLException ex) {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_REMOVE_FOLLOW);
        return GSON.toJson(variables);
      }
      variables = ImmutableMap.of("isValid", true);
      return GSON.toJson(variables);
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
      Map<String, Object> variables;

      try {
        int output = PostgresDatabase.loginUser(username, password);

        // Query execution success
        if (output == 1) {
          // Login success -> create new session and set response cookie
          Session session = request.session(true);
          request.session().attribute("username", username);
          response.cookie(".localhost:3000.", "/", "sessionID", request.session().id(), 3600, false, false);
          variables = ImmutableMap.of("status", ErrorConstants.LOGIN_SUCCESS);
        } else {
          // Login failed
          response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
          variables = ImmutableMap.of("error", ErrorConstants.ERROR_LOGIN_FAILED);
          return GSON.toJson(variables);
        }
      } catch (SQLException ex) {
        // Query execution failed
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_LOGIN_QUERY);
      }
      return GSON.toJson(variables);
    }
  }

  /**
   * Gets all users current user is following.
   */
  public static class GetAllFollowing implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      Map<String, Object> variables;
      String username = "";
      List<String> following;

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
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
        following = PostgresDatabase.getAllFollowing(username);
      } catch(SQLException ex) {
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_GET_FOLLOWING);
        return GSON.toJson(variables);
      }

      variables = ImmutableMap.of("following", following);
      return GSON.toJson(variables);
    }
  }
}

