package edu.brown.cs.everybody.utils;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.everybody.userComponents.FeedHandlers;
import edu.brown.cs.everybody.userComponents.UserHandlers;
import org.json.JSONObject;
import spark.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.Map;

/**
 * Class encapsulating server-side logic.
 */
public class Server {
  private static final Gson GSON = new Gson();

  public Server(int port) throws Exception {
    // Run server
    runSparkServer(port);
  }

  /**
   * Runs the Spark server.
   *
   * @param port port number
   */
  private void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");

    // Set initial headers
    Spark.options("/*", (request, response) -> {
      // Retrieve value of access control headers
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }
      return "OK";
    });

    // Setup Spark Routes
    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    Spark.exception(Exception.class, new ExceptionPrinter());

    // For user creation
    Spark.get("/newUser", new UserHandlers.NewUserHandler());
    // For user information
    Spark.post("/userInfo", new UserHandlers.GetUserInfoHandler());
    // For uploading an exercise
    Spark.post("/uploadExercise", new FeedHandlers.UploadExerciseHandler());
    // For uploading a workout
    Spark.get("/uploadWorkout", new FeedHandlers.UploadWorkoutHandler());
    // For retrieving a user's uploaded workouts
    Spark.post("/userWorkouts", new FeedHandlers.GetWorkoutsHandler());
    // For retrieving a user's uploaded exercises (within a workout)
    Spark.post("/userExercises", new FeedHandlers.GetExercisesHandler());
    // For user deletion
    Spark.get("deleteUser", new UserHandlers.DeleteUserHandler());
  }

  /**
   * Display an error page when an exception occurs in the server.
   */
  private static class ExceptionPrinter implements ExceptionHandler {
    @Override
    public void handle(Exception e, Request req, Response res) {
      res.status(500);
      StringWriter stacktrace = new StringWriter();
      try (PrintWriter pw = new PrintWriter(stacktrace)) {
        pw.println("<pre>");
        e.printStackTrace(pw);
        pw.println("</pre>");
      }
      res.body(stacktrace.toString());
    }
  }
}
