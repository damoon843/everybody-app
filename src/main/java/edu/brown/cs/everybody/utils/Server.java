package edu.brown.cs.everybody.utils;

import com.google.gson.Gson;
import edu.brown.cs.everybody.data.DataSourcePool;
import edu.brown.cs.everybody.feedComponents.FeedHandlers;
import edu.brown.cs.everybody.feedComponents.RecommendationHandler;
import edu.brown.cs.everybody.userComponents.UserHandlers;
import spark.*;

import java.io.PrintWriter;
import java.io.StringWriter;


/**
 * Class encapsulating server-side logic.
 */
public class Server {
  private static final Gson GSON = new Gson();

  public Server(int port) throws Exception {
    // Configure BasicDataSource
    DataSourcePool.configurePool();
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
    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "http://localhost:3000"));
    Spark.before((request, response) -> response.header("Access-Control-Allow-Credentials", "true"));

    Spark.exception(Exception.class, new ExceptionPrinter());

    // For user creation
    Spark.post("/newUser", new UserHandlers.NewUserHandler());
    // For user login
    Spark.post("/login", new UserHandlers.LoginHandler());
    // For user logout
    Spark.post("/logout", new UserHandlers.LogoutHandler());
    // For user information
    Spark.post("/userInfo", new UserHandlers.GetUserInfoHandler());
    // For uploading an exercise
    Spark.post("/uploadExercise", new FeedHandlers.UploadExerciseHandler());
    // For uploading a workout
    Spark.post("/uploadWorkout", new FeedHandlers.UploadWorkoutHandler());
    // For retrieving a user's uploaded workouts
    Spark.post("/userWorkouts", new FeedHandlers.GetWorkoutsHandler());
    // For retrieving a user's liked workouts
    Spark.post("/likedWorkouts", new FeedHandlers.GetLikedWorkoutsHandler());
    // For retrieving the uploaded exercises (within a workout)
    Spark.post("/getWorkoutExercises", new FeedHandlers.GetExercisesHandler());
    // For user deletion
    Spark.post("/deleteUser", new UserHandlers.DeleteUserHandler());
    // For home feed recommendations
    Spark.post("/getRecommendations", new RecommendationHandler.Handler());
    // For exercises page
    Spark.post("/publicExercises", new FeedHandlers.GetPublicExercisesHandler());
    // For follow actions
    Spark.post("/follow", new UserHandlers.FollowHandler());
    // For exercise filtering
    Spark.post("/searchExercises", new FeedHandlers.SearchExercisesHandler());
    // For unfollow actions
    Spark.post("/unfollow", new UserHandlers.UnfollowHandler());
    // Retrieves all users a particular user is following
    Spark.post("/allFollowing", new UserHandlers.GetAllFollowing());
    // Registers a like (on a workout)
    Spark.post("/registerLike", new FeedHandlers.LikeHandler());
    // Registers an unlike (on a workout)
    Spark.post("/unregisterLike", new FeedHandlers.UnlikeHandler());
    // Returns all usernames which are like the search query
    Spark.post("/getMatchingUsers", new UserHandlers.GetMatchingUsersHandler());
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
