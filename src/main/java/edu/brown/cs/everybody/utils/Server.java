package edu.brown.cs.everybody.utils;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import org.json.JSONObject;
import spark.*;

import java.io.PrintWriter;
import java.io.StringWriter;
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

    // TODO: handler classes stored here for now; consider extracting to distinct classes if this file gets too long
    // For user creation
    Spark.post("/newUser", new NewUserHandler());
  }

  /**
   * Handles requests made for user creation.
   */
  private static class NewUserHandler implements Route {
    @Override
    public Object handle(Request request, Response response) throws Exception {
      JSONObject data = new JSONObject(request.body());
      Map<String, Object> variables = ImmutableMap.of("foo", "bar");
      return GSON.toJson(variables);
    }
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
