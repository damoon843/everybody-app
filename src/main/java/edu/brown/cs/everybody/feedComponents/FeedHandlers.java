package edu.brown.cs.everybody.feedComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import org.json.JSONArray;
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

      PostgresDatabase.insertUserExercise(username, exerciseName, mediaLink, duration, exerciseTargetArea,
        exerciseType, description, (java.sql.Date) createdAt);

      return null;
    }
  }

  public static class UploadWorkoutHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      List<Integer> exerciseIds = new ArrayList<>(); // To store a workout's exercise IDs

      // TODO: verify JSONObject array (with username, exerciseName elements)

      JSONArray jsonObjects = data.getJSONArray("exerciseList");
      for (int i = 0; i < jsonObjects.length(); i++) {
        JSONObject temp = (JSONObject) jsonObjects.get(i);
        String username = temp.getString("username");
        String exerciseName = temp.getString("exerciseName");
        Integer exerciseId = PostgresDatabase.getExerciseId(username, exerciseName);
        exerciseIds.add(exerciseId);
      }

      String createdAtStr = data.getString("createdAt");
      Integer duration = data.getInt("duration");
      String mediaLink = data.getString("mediaLink");
      Integer totalLikes = 0;
      String description = data.getString("description");
      String username = data.getString("username");
      String workoutName = data.getString("workoutName");

      // TODO: verify date format
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      Date createdAt = sdf.parse(createdAtStr);

      PostgresDatabase.insertUserWorkout((java.sql.Date) createdAt, duration, mediaLink, totalLikes,
        description, username, workoutName, exerciseIds);

      return null;
    }
  }

  /**
   * Retrieves all workouts posted by a user (for profile).
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
   * Retrieves all exercises within a workout posted by a user (for profile).
   */
  public static class GetExercisesHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      String username = data.getString("username");
      String workoutName = data.getString("workoutName");

      List<Exercise> exercises = PostgresDatabase.getUserExercises(username, workoutName);

      // TODO: convert Exercise objects attributes into list of maps

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

