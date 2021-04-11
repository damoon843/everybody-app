package edu.brown.cs.everybody.userComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Exercise;
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

  public static class UploadExerciseHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      String username = data.getString("username");
      String exerciseName = data.getString("exerciseName");
      String mediaLink = data.getString("mediaLink");
      Integer duration = data.getInt("duration");
      String exerciseTargetArea = data.getString("targetArea");
      String exerciseType = data.getString("exerciseType");
      String description = data.getString("description");
      String createdAtStr = data.getString("createdAt");

      // TODO: verify date format
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Date createdAt = sdf.parse(createdAtStr);

      PostgresDatabase.insertUserExercise();

      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
  }

  public static class UploadWorkoutHandler implements Route {
    // TODO: frontend should have stored exercise IDs as an array
    // TODO: update workout_id for each exercise
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());


      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
  }

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

      List<Exercise> exercises = PostgresDatabase.getUserExercises(username, workoutName);

      // TODO: convert Exercise objects attributes into list

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

