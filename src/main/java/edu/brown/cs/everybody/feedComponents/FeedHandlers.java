package edu.brown.cs.everybody.feedComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;
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
      JSONArray tagsJSON = data.getJSONArray("tags");
      String description = data.getString("description");

      // Extract tags from JSONArray
      List<String> tags  = new ArrayList<>();
      for (int i = 0; i < tagsJSON.length(); i++) {
        tags.add((String) tagsJSON.get(i));
      }

      PostgresDatabase.insertUserExercise(username, exerciseName, mediaLink, duration, tags,
        description);

      return null;
    }
  }

  public static class UploadWorkoutHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      List<Integer> exerciseIds = new ArrayList<>(); // To store a workout's exercise IDs

      JSONArray jsonObjects = data.getJSONArray("exerciseList");
      for (int i = 0; i < jsonObjects.length(); i++) {
        JSONObject temp = (JSONObject) jsonObjects.get(i);
        String username = temp.getString("username");
        String exerciseName = temp.getString("exerciseName");
        Integer exerciseId = PostgresDatabase.getExerciseId(username, exerciseName);
        exerciseIds.add(exerciseId);
      }

      Integer duration = data.getInt("duration");
      String mediaLink = data.getString("mediaLink");
      Integer totalLikes = 0; // 0 likes upon initial upload
      String description = data.getString("description");
      String username = data.getString("username");
      String workoutName = data.getString("workoutName");

      PostgresDatabase.insertUserWorkout(duration, mediaLink, totalLikes,
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
      List<Map<String, String>> output = new ArrayList<>();

      String username = data.getString("username");
      PriorityQueue<Workout> workouts = PostgresDatabase.getUserWorkouts(username);

      Workout finalWorkout = workouts.poll();
      while (finalWorkout != null) {
        output.add(finalWorkout.toMap());
        finalWorkout = workouts.poll();
      }
      Map<String, Object> variables = ImmutableMap.of("workouts", output);
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

      Map<Integer, List<Object>> exercises = PostgresDatabase.getUserExercises(username, workoutName);
      Map<Integer, List<Object>> variables = ImmutableMap.copyOf(exercises);

      return GSON.toJson(variables);
    }
  }

  /**
   * Retrieves exercises for the public exercises page.
   */
  public static class GetPublicExercisesHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      Map<Integer, List<Object>> exercises = PostgresDatabase.getExercises();
      Map<Integer, List<Object>> variables = ImmutableMap.copyOf(exercises);
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

  /**
   * Retrieves 20 similar exercise names as user query.
   */
  // TODO
//  public static class SearchExercisesHandler implements Route {
//    @Override
//    public Object handle(Request request, Response response) throws Exception {
//      JSONObject data = new JSONObject(request.body());
//      List<Map<String, String>> output = new ArrayList<>();
//
//      String query = data.getString("query");
//      List<Exercise> exercises = PostgresDatabase.getSimilarExercises(query);
//
//      // TODO:
//      for(Exercise ex: exercises) {
//        output.add(ex.toMap());
//      }
//
//      Map<String, Object> variables = ImmutableMap.of("exercises", output);
//      return GSON.toJson(variables);
//    }
  }


}

