package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.util.Map;

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
}
