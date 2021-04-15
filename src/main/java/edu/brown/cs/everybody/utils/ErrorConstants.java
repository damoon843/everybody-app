package edu.brown.cs.everybody.utils;

/**
 * ErrorMessages and helper functions for outputting errors.
 */
public final class ErrorConstants {

  /** Empty constructor for the ErrorConstants class. */
  private ErrorConstants() { }
  public static final String ERROR_DATABASE_SETUP = "Error setting up database connection.";
  public static final String ERROR_QUERY_EXCEPTION = "Error executing query.";
  public static final String ERROR_DATABASE_CLOSE = "Error closing database connection.";
  public static final String ERROR_NULL_SESSION = "Error retrieving session.";
  public static final String ERROR_GET_WORKOUTID = "Error retrieving workout ID.";
  public static final String ERROR_GET_USERINFO = "Error retrieving user info.";
  public static final String ERROR_GET_USERID = "Error retrieving user ID.";
  public static final String ERROR_GET_USER = "Error retrieving user.";
  public static final String ERROR_GET_ADDWORKOUTS = "Error retrieving additional workouts";
  public static final String ERROR_INSERT_FOLLOW = "Error following user.";
  public static final String ERROR_REMOVE_FOLLOW = "Error unfollowing user.";
  public static final String ERROR_LOGIN_QUERY = "Error executing log-in query.";
  public static final String ERROR_GET_FOLLOWING= "Error retrieving all followers";
  public static final String ERROR_INSERT_USER = "Error inserting user.";
  public static final String ERROR_INSERT_EXERCISE = "Error inserting exercise.";
  public static final String ERROR_INSERT_WORKOUT = "Error inserting workout.";
  public static final String ERROR_GET_EXERCISEID = "Error retrieving exercise ID.";
  public static final String ERROR_GET_WORKOUTS = "Error retrieving user's workouts.";
  public static final String ERROR_GET_EXERCISES = "Error retrieving user's exercises.";
  public static final String ERROR_GET_PUBLIC_EXERCISES = "Error retrieving public exercises.";
  public static final String ERROR_GET_SIMILAR_EXERCISES = "Error retrieving similar exercises.";
  public static final String ERROR_INSERT_LIKE = "Error inserting like.";
  public static final String ERROR_REMOVE_LIKE = "Error removing like.";
  public static final String ERROR_GET_EXERCISE_DURATION  = "Error retrieving exercise duration.";
  public static final String ERROR_GET_USERNAME = "Error retrieving username.";
  public static final String ERROR_GET_RECENT_WORKOUTIDS = "Error retrieving recently viewed workout IDs.";

  public static final String ERROR_LOGIN_FAILED = "Failed to log-in with given credentials.";
  public static final String LOGIN_SUCCESS = "Log-in succeeded.";
}

