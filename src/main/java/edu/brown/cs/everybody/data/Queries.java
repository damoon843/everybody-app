package edu.brown.cs.everybody.data;

/**
 * Stores query strings to Postgres DB.
 */
public final class Queries {

  /** Empty constructor to prevent instantiation. */
  private Queries() {
  }

  /**
   * Query to insert user.
   * @return query string
   */
  public static String insertUserQuery() {
    return "INSERT INTO everybody_app.users(first_name, last_name, created_at, username, password)"
      + " VALUES(?,?,CURRENT_TIMESTAMP,?, ?);";
  }

  /**
   * Query to insert user preferences.
   * @return query string
   */
  public static String insertUserPreferencesQuery() {
    return "INSERT INTO everybody_app.user_preferences(workout_type, workout_duration)"
      + " VALUES(?,?);";
  }

  /**
   * Query to retrieve user info.
   * @return query string
   */
  public static String getUserInfo() {
    return "SELECT users.first_name, "
      + "users.last_name, "
      + "prefs.workout_type, "
      + "prefs.workout_duration "
      + "FROM users INNER JOIN user_preferences prefs ON users.id = prefs.user_id "
      + "WHERE users.username = ?";
  }

  /**
   * Query to retrieve a user's workouts.
   * @return query string
   */
  public static String getWorkouts() {
    return "SELECT *"
      + " FROM workouts"
      + " WHERE username = ?;";
  }

  /**
   * Query to retrieve a user's exercises (within a workout).
   * @return query string
   */
  public static String getExercisesFromWorkout() {
    return "SELECT exercises"
      + " FROM workouts WHERE username = ? AND workout_name = ?;";
  }

  /**
   * Query to retrieve info about an exercise.
   * @return query string
   */
  public static String getExerciseInfo() {
    return "SELECT exercise_name, media_link, duration,"
      + " tags, description, created_at"
      + " FROM exercises WHERE exercise_id = ?;";
  }

  /**
   * Query to insert an exercise to the database.
   * @return query string
   */
  public static String insertExercise() {
    return "INSERT INTO everybody_app.exercises(created_at, duration, media_link, description, username, exercise_name, tags)"
      + " VALUES(CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?);";
  }

  /**
   * Query to insert a workout to the database.
   * @return query string
   */
  public static String insertWorkout() {
    return "INSERT INTO everybody_app.workouts(created_at, duration, media_link, total_likes, exercises, descriptions, username, workout_name)"
      + " VALUES(CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?);";
  }

  /**
   * Query to retrieve the exercise ID from an exercise
   * @return query string
   */
  public static String getExerciseId() {
    return "SELECT exercise_id FROM exercises"
      + " WHERE username = ? AND exercise_name = ?;";
  }

  /**
   * Query to retrieve id's followed by a given input id.
   * @return query string
   */
  public static String getFollowingQuery() {
    return "SELECT following_id FROM following WHERE user_id = ?;";
  }

  /**
   * Query to retrieve 100 exercises for public exercises page.
   * @return query string
   */
  public static String getPublicExercises() {
    return "SELECT * FROM exercises"
      + " ORDER BY created_at DESC"
      + " LIMIT 100;";
  }

  /**
   * Query to retrieve full user info.
   * @return query string
   */
  public static String getUser() {
    return "SELECT user.id, user.username, user.created_at, users.first_name, "
        + "users.last_name, "
        + "prefs.workout_type, "
        + "prefs.workout_duration "
        + "FROM users INNER JOIN user_preferences AS prefs ON users.id = prefs.user_id "
        + "WHERE users.username = ?;";
  }

  /**
   * Query to retrieve id of username
   * @return query string
   */
  public static String getUserID() {
    return "SELECT id FROM users WHERE username = ?;";
  }

  /**
   * Query to retrieve recently viewed workouts of a user id.
   * @return query string
   */
  public static String recentlyViewed() {
    return "SELECT workout_id FROM viewed_workouts WHERE user_id = ?;";
  }

  /**
   * Query to insert a workout a user has been recommended to the viewed_workouts table.
   * @return query string
   */
  public static String insertViewedWorkout() {
    return "INSERT INTO viewed_workouts"
        + " VALUES(?, ?);";
  }

  /**
   * Query to insert a follow relationship to following.
   * @return query string
   */
  public static String insertFollow() {
    return "INSERT INTO following"
        + " VALUES(?, ?);";
  }

  /**
   * Query to unfollow a user.
   * @return query string
   */
  public static String removeFollow() {
    return "DELETE FROM following WHERE user_id = ? AND following_id = ?;";
  }

  /**
   * Query to see if login info matches existing user.
   * @return query string
   */
  public static String checkLogin() {
    return "SELECT username FROM users WHERE id = ? AND password = ?;";
  }

  /**
   * Query to retrieve 20 exercise names similar to some string input.
   * @return query string
   */
  public static String getSimilarExercises() {
    return "SELECT * FROM exercises"
        + " WHERE exercise_name LIKE %?% ORDER BY created_at DESC"
        + " LIMIT 20;";
  }
}
