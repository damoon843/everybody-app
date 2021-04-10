package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Workout;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Contains handler classes for feed-related logic.
 */
public class FeedHandlers {
  private static final Gson GSON = new Gson();

  /**
   * Retrieves all workouts posted by a user.
   */
  public static class GetWorkoutsHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      String username = data.getString("username");
      List<Workout> workouts = PostgresDatabase.getUserWorkouts(username);

      // TODO: convert Workout objects attributes into list

      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
  }

  /**
   * Retrieves all exercises within a workout posted by a user.
   */
  public static class GetExercisesHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      String username = data.getString("username");
      String workoutName = data.getString("workoutName");


      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
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

