package edu.brown.cs.everybody.feedComponents;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.utils.ErrorConstants;
import org.json.JSONArray;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Session;

import java.util.*;

/**
 * Contains handler classes for feed-related logic.
 */
public class FeedHandlers {
  private static final Gson GSON = new Gson();

  /**
   * Handler for uploading exercises.
   */
  public static class UploadExerciseHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());

      String username = "";
      String exerciseName = data.getString("exerciseName");
      String mediaLink = data.getString("mediaLink");
      Integer duration = data.getInt("duration");
      JSONArray tagsJSON = data.getJSONArray("tags");
      String description = data.getString("description");

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        Map<String, Object> variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }

      // Extract tags from JSONArray
      List<String> tags = new ArrayList<>();
      for (int i = 0; i < tagsJSON.length(); i++) {
        tags.add((String) tagsJSON.get(i));
      }

      PostgresDatabase.insertUserExercise(username, exerciseName, mediaLink, duration, tags,
        description);

      Map<String, Object> variables = ImmutableMap.of("message", "success");
      return GSON.toJson(variables);
    }
  }

  /**
   * Handler for uploading workouts.
   */
  public static class UploadWorkoutHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      List<Integer> exerciseIds = new ArrayList<>(); // To store a workout's exercise IDs

      JSONArray jsonObjects = data.getJSONArray("exerciseList");
      for (int i=0; i<jsonObjects.length(); i++) {
        exerciseIds.add(jsonObjects.getInt(i));
      }
      int duration = 0;
      for(int id: exerciseIds) {
        duration += PostgresDatabase.getDuration(id);
      }
      String mediaLink = data.getString("mediaLink");
      Integer totalLikes = 0; // 0 likes upon initial upload
      String description = data.getString("description");
      String username = "";
      String workoutName = data.getString("workoutName");

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        Map<String, Object> variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }

      PostgresDatabase.insertUserWorkout(duration, mediaLink, totalLikes,
        description, username, workoutName, exerciseIds);

      Map<String, Object> variables = ImmutableMap.of("message", "success");
      return GSON.toJson(variables);
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
      String username = "";

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        Map<String, Object> variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }

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

      String username = "";
      String workoutName = data.getString("workoutName");

      // Retrieve session
      Session session = request.session(false);
      if (session != null) {
        // Retrieval successful, get username
        username = session.attribute("username");
      } else {
        // Retrieval failed
        System.out.println(ErrorConstants.ERROR_NULL_SESSION);
        Map<String, Object> variables = ImmutableMap.of("error", ErrorConstants.ERROR_NULL_SESSION);
        return GSON.toJson(variables);
      }

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
      Map<Integer, List<Object>> exercises = PostgresDatabase.getExercises();
      Map<Integer, List<Object>> variables = ImmutableMap.copyOf(exercises);
      return GSON.toJson(variables);
    }
  }

  /**
   * Retrieves 20 similar exercise names as user query.
   */
  public static class SearchExercisesHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      String query = data.getString("query");

      Map<Integer, List<Object>> exercises = PostgresDatabase.getSimilarExercises(query);
      Map<Integer, List<Object>> variables = ImmutableMap.copyOf(exercises);
      return GSON.toJson(variables);
    }
  }
}

