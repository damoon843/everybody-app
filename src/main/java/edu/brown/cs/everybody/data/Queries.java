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
      + " VALUES(?,?,CURRENT_TIMESTAMP,?, ?) RETURNING id;";
  }

  /**
   * Query to insert user preferences.
   * @return query string
   */
  public static String insertUserPreferencesQuery() {
    return "INSERT INTO everybody_app.user_preferences(user_id, workout_type, workout_duration)"
      + " VALUES(?,?,?);";
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
      + "FROM everybody_app.users INNER JOIN everybody_app.user_preferences prefs ON users.id = prefs.user_id "
      + "WHERE users.username = ?";
  }

  /**
   * Query to retrieve a user's workouts.
   * @return query string
   */
  public static String getWorkouts() {
    return "SELECT *"
      + " FROM everybody_app.workouts"
      + " WHERE username = ?;";
  }

  /**
   * Query to retrieve a user's exercises (within a workout).
   * @return query string
   */
  public static String getExercisesFromWorkout() {
    return "SELECT exercises"
      + " FROM everybody_app.workouts WHERE username = ? AND workout_name = ?;";
  }

  /**
   * Query to retrieve info about an exercise.
   * @return query string
   */
  public static String getExerciseInfo() {
    return "SELECT exercise_name, media_link, duration,"
      + " tags, description, created_at"
      + " FROM everybody_app.exercises WHERE exercise_id = ?;";
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
    return "INSERT INTO everybody_app.workouts(created_at, duration, media_link, total_likes, exercises, description, username, workout_name)"
      + " VALUES(CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, ?);";
  }

  /**
   * Query to retrieve the exercise ID from an exercise
   * @return query string
   */
  public static String getExerciseId() {
    return "SELECT exercise_id FROM everybody_app.exercises"
      + " WHERE username = ? AND exercise_name = ?;";
  }

  /**
   * Query to retrieve id's followed by a given input id.
   * @return query string
   */
  public static String getFollowingQuery() {
    return "SELECT following_id FROM everybody_app.following WHERE user_id = ?;";
  }

  /**
   * Query to retrieve 100 exercises for public exercises page.
   * @return query string
   */
  public static String getPublicExercises() {
    return "SELECT * FROM everybody_app.exercises"
      + " ORDER BY created_at DESC"
      + " LIMIT 100;";
  }

  /**
   * Query to retrieve full user info.
   * @return query string
   */
  public static String getUser() {
    return "SELECT * FROM everybody_app.users JOIN everybody_app.user_preferences ON users.id = user_preferences.user_id "
        + "WHERE users.id = ?;";
  }

  /**
   * Query to retrieve id of username
   * @return query string
   */
  public static String getUserID() {
    return "SELECT id FROM everybody_app.users WHERE username = ?;";
  }

  /**
   * Query to retrieve recently viewed workouts of a user id.
   * @return query string
   */
  public static String recentlyViewed() {
    return "SELECT workout_id FROM everybody_app.viewed_workouts WHERE user_id = ?;";
  }

  /**
   * Query to insert a workout a user has been recommended to the viewed_workouts table.
   * @return query string
   */
  public static String insertViewedWorkout() {
    return "INSERT INTO everybody_app.viewed_workouts"
        + " VALUES(?, ?);";
  }

  /**
   * Query to insert a follow relationship to following.
   * @return query string
   */
  public static String insertFollow() {
    return "INSERT INTO everybody_app.following"
        + " VALUES(?, ?);";
  }

  /**
   * Query to unfollow a user.
   * @return query string
   */
  public static String removeFollow() {
    return "DELETE FROM everybody_app.following WHERE user_id = ? AND following_id = ?;";
  }

  /**
   * Query to see if login info matches existing user.
   * @return query string
   */
  public static String checkLogin() {
    return "SELECT username FROM everybody_app.users WHERE username = ? AND password = ?;";
  }

  /**
   * Query to retrieve 20 exercise names similar to some string input.
   * @return query string
   */
  public static String getSimilarExercises() {
    return "SELECT * FROM everybody_app.exercises"
        + " WHERE exercise_name LIKE '%?%' ORDER BY created_at DESC"
        + " LIMIT 20;";
  }

  /**
   * Query to retrieve exercise duration.
   * @return query string
   */
  public static String getDuration() {
    return "SELECT duration FROM everybody_app.exercises WHERE exercise_id = ?";
  }

  /**
   * Query to get all users a user follows.
   * @return query string
   */
  public static String getAllFollowing() {
    return "SELECT following_id FROM everybody_app.following WHERE user_id = ?;";
  }

  /**
   * Gets username of an id.
   * @return query string
   */
  public static String getUsername() {
    return "SELECT username FROM everybody_app.users WHERE id = ?;";
  }

  /**
   * Gets certain number of additional workouts ranked on total like_count.
   * @return query string
   */
  public static String getCommunityWorkouts() {
    return "SELECT * FROM everybody_app.workouts ORDER BY workouts.total_likes DESC LIMIT ?;";
  }

  /**
   * Inserts a like on a workout.
   * @return query string
   */
  public static String insertLike() {
    return "INSERT INTO everybody_app.likes(workout_id, user_id) VALUES(?,?);";
  }

  /**
   * Removes a like from a workout.
   * @return query string
   */
  public static String removeLike() {
    return "DELETE FROM ONLY everybody_app.likes"
      + " WHERE workout_id = ? AND user_id = ?;";
  }

  /**
   * Retrieves workout ID.
   * @return query string
   */
  public static String getWorkoutId() {
    return "SELECT workout_id FROM everybody_app.workouts"
      + " WHERE workout_name = ? AND username = ?;";
  }

  /**
   * Retrieves whether a user follows another.
   * @return query string
   */
  public static String getRelation() {
    return "SELECT * FROM everybody_app.following WHERE user_id = ? AND following_id = ?;";
  }

  /**

   * Retrieves similar usernames to input string that current user doesn't follow.
   * @return query string
   */
  public static String getMatching() {
    return "SELECT id, username FROM everybody_app.users WHERE username LIKE '%?%' AND"
    + " id NOT IN (SELECT following_id FROM everybody_app.following WHERE user_id = ?)";
  }

  
  /**
   * Wipes user from DB.
   * @return query string
   */
  public static String removeUser() {
    return "";
  }
}
