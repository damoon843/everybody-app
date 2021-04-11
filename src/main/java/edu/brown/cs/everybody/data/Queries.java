package edu.brown.cs.everybody.data;

/**
 * Stores query strings to Postgres DB.
 */
public final class Queries {

  /** Empty constructor to prevent instantiation. */
  private Queries() {

  }

  /**
   * Query to insert user
   * @return query string
   */
  public static String insertUserQuery() {
    return "INSERT INTO users(first_name, last_name, created_at, username)"
      + " VALUES(?,?,?,?);";
  }

  /**
   * Query to insert user preferences
   * @return query string
   */
  public static String insertUserPreferencesQuery() {
    return "INSERT INTO user_preferences(workout_type, workout_duration)"
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
   * Query to retrieve a user's workouts
   * @return query string
   */
  public static String getWorkouts() {
    return "SELECT description, workout_type, duration, media_link, total_likes, workout_name"
      + " FROM workouts"
      + " WHERE username = ?;";
  }

  /**
   * Query to retrieve a user's exercises (within a workout)
   * @return query string
   */
  public static String getExercisesFromWorkout() {
    return "SELECT exercises"
      + " FROM workouts WHERE username = ? AND workout_name = ?;";
  }

  /**
   * Query to retrieve info about an exercise
   * @return query string
   */
  public static String getExerciseInfo() {
    return "SELECT exercise_name, media_link, duration, exercise_type, exercise_target_area, description"
      + " FROM exercises WHERE exercise_id = ?;";
  }

  public static String insertExercise() {
    return "INSERT INTO exercises"
      + " VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
  }

  public static String insertWorkout() {
    return "INSERT INTO workouts"
      + " VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
  }

  public static String getExerciseId() {
    return "SELECT exercise_id FROM exercises"
      + " WHERE username = ? AND exercise_name = ?;";
  }
}
