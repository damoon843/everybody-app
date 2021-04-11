package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

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
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      // Parse request from client
      // TODO: verify info sent from frontend
      String fName = data.getString("firstName");
      String lName = data.getString("lastName");
      String createdAtStr = data.getString("createdAt");
      String username = data.getString("username");
      String workoutType = data.getString("workoutType");
      Integer workoutDuration = data.getInt("workoutDuration");

      // Format date
      // TODO: verify date format
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Date createdAt = sdf.parse(createdAtStr);

      List<Object> listData = new ArrayList<>(Arrays.asList(fName, lName, createdAt, username, workoutType, workoutDuration));
      PostgresDatabase.insertUser(listData);
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
}
