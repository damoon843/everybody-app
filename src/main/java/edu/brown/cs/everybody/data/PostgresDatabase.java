package edu.brown.cs.everybody.data;

import edu.brown.cs.everybody.feedComponents.Exercise;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.userComponents.AppUser;
import edu.brown.cs.everybody.utils.ErrorConstants;
import edu.brown.cs.everybody.utils.WorkoutComparator;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.sql.*;
import java.sql.Date;
import java.util.*;

/**
 * Singleton class wrapping PostgreSQL DB and
 * its related SQL commands.
 */
public final class PostgresDatabase {
//  private static PostgresDatabase singleInstance = null;
  private static Connection dbConn = null;

  // TODO: cache getUser?
  // main.java concurrency (stretch feature)
  // cache of users, getUser/getFollowers query called in constructor so also cached?


  /* Hidden constructor to avoid instantiation */
  private PostgresDatabase() {
  }

//  /**
//   * Singleton getter for PostgresDatabase and sets up DB connection.
//   * @return single instance of PostgresDatabase.
//   */
//  public static PostgresDatabase getInstance() throws URISyntaxException, SQLException {
//    if (singleInstance == null) {
//      singleInstance = new PostgresDatabase();
//      if (setUpConnection() == null) {
//        System.out.println(ErrorConstants.ERROR_DATABASE_SETUP);
//      }
//    }
//    return singleInstance;
//  }

  /**
   * Establishes connection to pg DB.
   * @return connection to DB if successful, null if failed
   * @throws URISyntaxException when given improper URI
   * @throws SQLException when driver cannot retrieve conn
   */
  public static Connection setUpConnection() throws URISyntaxException, SQLException {
    // TODO: encode these details elsewhere
    String tempURI = "postgres://roifqtuewetfej:7d514e978ce5f83a75ca408a356cb5e5324a3657960f95a3533aeb93622c5" +
      "906@ec2-52-7-115-250.compute-1.amazonaws.com:5432/d97rt21a1m7m9k\n";

    URI dbUri = new URI(System.getenv(tempURI));
    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

    dbConn = DriverManager.getConnection(dbUrl, username, password);
    return dbConn;
  }

  /**
   * Tears down connection ot pg DB.
   */
  public static void tearDownConnection() {
    // TODO: fill this out.
  }

  /**
   * Inserts a new user into the users table (sign-up).
   * @param data list of user-related data to insert
   */
  public static void insertUser(List<Object> data) throws SQLException {
    String insertString = Queries.insertUserQuery();

    // Insert into users table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setString(1, (String) data.get(0));
      stmt.setString(2, (String) data.get(1));
      stmt.setDate(3, (Date) data.get(2));
      stmt.setString(4, (String) data.get(3));
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }

    // Insert into user_preferences table
    insertString = Queries.insertUserQuery();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setString(1, (String) data.get(3));
      stmt.setString(2, (String) data.get(4));
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Retrieves an existing user's information with username.
   * @param username username
   * @return list of user info
   */
  public static List<Object> getUserInfo(String username) throws SQLException {
    String queryString = Queries.getUserInfo();
    List<Object> result = new ArrayList<>();

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);

      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          String firstName = res.getString("first_name");
          String lastName = res.getString("last_name");
          String workoutType = res.getString("workout_type");
          Integer workoutDuration = res.getInt("workout_duration");

          result.add(firstName);
          result.add(lastName);
          result.add(workoutType);
          result.add(workoutDuration);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
        throw new SQLException(ex.getMessage());
      }
      return result;
    }
  }

  /**
   * Retrieves a user's uploaded workouts.
   * @param username username
   * @return list of Workout objects
   */
  public static PriorityQueue<Workout> getUserWorkouts(String username) throws SQLException {
    String queryString = Queries.getWorkouts();
    PriorityQueue<Workout> pq = new PriorityQueue<>(new WorkoutComparator());
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          int workoutID = res.getInt("workout_id");
          String workoutName = res.getString("workout_name");
          Date created = res.getDate("created_at");
          int likes = res.getInt("total_likes");
          URL mediaLink = res.getURL("media_link");
          int duration = res.getInt("duration");
          String createrUsername = res.getString("username");
          String description = res.getString("description");
          Workout workout = new Workout.WorkoutBuilder().workout_id(workoutID).workout_name(workoutName).
              username(createrUsername).created_at(created).description(description)
              .duration(duration).media_link(mediaLink).like_count(likes).buildWorkout();
          pq.add(workout);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
        throw new SQLException(ex.getMessage());
      }
      return pq;
    }
  }

  /**
   * Retrieves a user's exercises within a specific workout.
   * @param username username
   * @param workoutName workout name
   * @return list of Exercise objects
   */
  public static List<Exercise> getUserExercises(String username, String workoutName) throws SQLException {
    String queryString = Queries.getExercisesFromWorkout();
    List<Exercise> exercises = new ArrayList<>();
    List<Integer> exerciseIds = new ArrayList<>();

    // Retrieve order of exercise IDs
    try (PreparedStatement stmt1 = dbConn.prepareStatement(queryString)) {
      stmt1.setString(1, username);
      stmt1.setString(2, workoutName);

      try (ResultSet res = stmt1.executeQuery()) {
        while (res.next()) {
          Integer exerciseId = res.getInt("exercise_id");
          exerciseIds.add(exerciseId);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
        throw new SQLException(ex.getMessage());
      }

      // Retrieve each exercise's details
      queryString = Queries.getExerciseInfo();

      try (PreparedStatement stmt2 = dbConn.prepareStatement(queryString)) {
        for (int id : exerciseIds) {
          stmt2.setInt(1, id);

          try (ResultSet res = stmt2.executeQuery()) {
            while (res.next()) {
              String exerciseName = res.getString("exercise_name");
              String mediaLink = res.getString("media_link");
              Integer duration = res.getInt("duration");
              String exerciseType = res.getString("exercise_type");
              String targetArea = res.getString("exercise_target_area");
              String description = res.getString("description");

              // TODO: create Exercise object
              Exercise temp = null;
              exercises.add(temp);
            }
          } catch (SQLException ex) {
            System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
            throw new SQLException(ex.getMessage());
          }
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
        throw new SQLException(ex.getMessage());
      }
      return exercises;
    }
  }

  /**
   * Inserts an uploaded exercise
   * @param username username
   * @param exerciseName exercise name
   * @param mediaLink media URL
   * @param duration length of exercise (seconds)
   * @param targetArea exercise target area
   * @param type exercise type
   * @param description description
   * @param createdAt exercise creation timestamp
   */
  public static void insertUserExercise(String username, String exerciseName, String mediaLink, Integer duration,
                                           String targetArea, String type, String description, Date createdAt) throws SQLException {
    String insertString = Queries.insertExercise();

    // Insert into exercises table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setDate(1, createdAt);
      stmt.setInt(2, duration);
      stmt.setString(3, mediaLink);
      stmt.setString(4, description);
      stmt.setString(5, targetArea);
      stmt.setString(6, type);
      stmt.setString(7, username);
      stmt.setString(8, exerciseName);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Helper method for insertUserWorkout. Retrieves exercise ID.
   */
  public static Integer getExerciseId(String username, String exerciseName) throws SQLException {
    String queryString = Queries.getExerciseId();
    Integer exerciseId = 0;

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);
      stmt.setString(2, exerciseName);

      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Integer exerciseID = res.getInt("exercise_id");
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }

    return exerciseId;
  }


  /**
   * Inserts an uploaded workout.
   * @param createdAt uploaded timestamp
   * @param duration length of workout
   * @param mediaLink media link
   * @param totalLikes likes of workout
   * @param description description of workout
   * @param username username of poster
   * @param workoutName workout name
   * @param exerciseIds list of exercises in the workout
   */
  public static void insertUserWorkout(Date createdAt, Integer duration, String mediaLink, Integer totalLikes,
                                       String description, String username, String workoutName, List<Integer> exerciseIds) throws SQLException {
    String insertString = Queries.insertWorkout();

    // Insert into workouts table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setDate(1, createdAt);
      stmt.setInt(2, duration);
      stmt.setString(3, mediaLink);
      stmt.setInt(4, totalLikes);
      stmt.setArray(5, (Array) exerciseIds);
      stmt.setString(6, description);
      stmt.setString(7, username);
      stmt.setString(8, workoutName);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Deletes an existing user from the users table.
   */
  public static void deleteUser() {
  }

  /**
   * Gets all the users the input user follows.
   * @param id input user ID.
   * @return list of user ID's.
   */
  public static List<Integer> getFollowing(int id) throws SQLException {
    String getString = Queries.getFollowingQuery();
    List<Integer> following = new ArrayList<>();
    try (PreparedStatement stmt = dbConn.prepareStatement(getString)) {
      stmt.setInt(1, id);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Integer userID = res.getInt("following_id");
          following.add(userID);
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    return following;
  }

  /**
   * Queries database for the user specified by input id and encapsulates with a AppUser.
   * @param id user ID
   * @return AppUser object containing info about user with given id
   */
  public static AppUser getUser(int id) throws SQLException {
    String queryString = Queries.getUser();
    AppUser user = null;
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setInt(1, id);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          String firstName = res.getString("first_name");
          int userID = res.getInt("id");
          String username = res.getString("username");
          Date created_at = res.getDate("created_at");
          String lastName = res.getString("last_name");
          String workoutType = res.getString("workout_type");
          Integer workoutDuration = res.getInt("workout_duration");
          user = new AppUser(userID, username, created_at, firstName, lastName, workoutType, workoutDuration);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
        throw new SQLException(ex.getMessage());
      }
      return user;
    }
  }

  /**
   * Adds recently viewed workout recommended to a user to viewed_workouts table.
   * @param user user id
   * @param workout workout id
   */
  public static void addRecentlyViewed(int user, int workout) throws SQLException {
    String insertString = Queries.insertViewedWorkout();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, user);
      stmt.setInt(2, workout);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Gets all the recently viewed workout Ids for a given user.
   * @param userID user id
   * @return set of workout ids
   *
   */
  public static Set<Integer> getRecentlyViewed(int userID) throws SQLException{
    String queryString = Queries.recentlyViewed();
    Set<Integer> workouts = new HashSet<>();
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setInt(1, userID);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Integer workoutID = res.getInt("workout_id");
          workouts.add(workoutID);
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    return workouts;
  }

  /**
   * Gets user name associated with a user id.
   * @param userID user id
   * @return username
   */
  public static String getUserName(int userID) throws SQLException {
    String queryString = Queries.getUsername();
    String username = "";
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setInt(1, userID);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          username = res.getString("username");
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    return username;
  }
}
