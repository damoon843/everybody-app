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
}
