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
   * Handles user logout.
   */
  public static class LogoutHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      Map<String, Object> variables;

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, invalidate session
        session.invalidate();
        variables = ImmutableMap.of("isValid", true);
      } else {
        // Retrieval failed
        response.status(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
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

  /**
   * Handles search user requests.
   */
  //public static class GetMatchingUsersHandler implements Route {

  //}
}

