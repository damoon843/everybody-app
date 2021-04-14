package edu.brown.cs.everybody.utils;

/**
 * ErrorMessages and helper functions for outputting errors.
 */
public final class ErrorConstants {

  /** Empty constructor for the ErrorConstants class. */
  private ErrorConstants() { }
  public static final String ERROR_SOME_MESSAGE = "some error message";

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

  public static final String ERROR_LOGIN_FAILED = "Failed to log-in with given credentials.";
  public static final String LOGIN_SUCCESS = "Log-in succeeded.";
}

