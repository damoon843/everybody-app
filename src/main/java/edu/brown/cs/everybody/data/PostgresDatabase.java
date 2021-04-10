package edu.brown.cs.everybody.data;

import edu.brown.cs.everybody.feedComponents.Exercise;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.userComponents.AppUser;
import edu.brown.cs.everybody.utils.ErrorConstants;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Singleton class wrapping PostgreSQL DB and
 * its related SQL commands.
 */
public final class PostgresDatabase {
  private static PostgresDatabase singleInstance = null;
  private static Connection dbConn = null;

  /* Hidden constructor to avoid instantiation */
  private PostgresDatabase() {
  }

  /**
   * Singleton getter for PostgresDatabase and sets up DB connection.
   * @return single instance of PostgresDatabase.
   */
  public static PostgresDatabase getInstance() throws URISyntaxException, SQLException {
    if (singleInstance == null) {
      singleInstance = new PostgresDatabase();
      if (setUpConnection() == null) {
        System.out.println(ErrorConstants.ERROR_DATABASE_SETUP);
      }
    }
    return singleInstance;
  }

  /**
   * Establishes connection to pg DB.
   * @return connection to DB if successful, null if failed
   * @throws URISyntaxException when given improper URI
   * @throws SQLException when driver cannot retrieve conn
   */
  private static Connection setUpConnection() throws URISyntaxException, SQLException {
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
  public static void insertUser(List<Object> data) {
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
    }

    // Insert into user_preferences table
    insertString = Queries.insertUserQuery();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setString(1, (String) data.get(3));
      stmt.setString(2, (String) data.get(4));
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
    }
  }

  /**
   * Retrieves an existing user's information with username.
   * @param username username
   * @return AppUser object
   */
  public static AppUser getUserInfo(String username) throws SQLException {
    String queryString = Queries.getUserInfo();
    AppUser user = null;

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);

      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          String firstName = res.getString("first_name");
          String lastName = res.getString("last_name");
          String workoutType = res.getString("workout_type");
          Integer workoutDuration = res.getInt("workout_duration");

          // TODO: encapsulate all fields in AppUser object
          user = new AppUser(null, firstName, lastName);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      }
      return user;
    }
  }

  /**
   * Retrieves a user's uploaded workouts.
   * @param username username
   * @return list of Workout objects
   */
  public static List<Workout> getUserWorkouts(String username) throws SQLException {
    String queryString = Queries.getWorkouts();
    List<Workout> workouts = null;

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);

      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Workout temp = null;
          String workoutName = res.getString("workout_name");
          Integer likes = res.getInt("total_likes");
          String mediaLink = res.getString("media_link");
          Integer duration = res.getInt("duration");
          String workoutType = res.getString("workout_type");
          String description = res.getString("description");

          temp = new Workout.WorkoutBuilder().name(workoutName).like_count(likes).
            media_link(mediaLink).duration(duration).type(workoutType).description(description).buildWorkout();

          workouts.add(temp);
        }
      } catch (SQLException ex) {
        System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      }
      return workouts;
    }
  }

  /**
   * Retrieves a user's exercises within a specific workout.
   * @param username username
   * @param workoutName workout name
   * @return list of Exercise objects
   */
  public static List<Exercise> getUserExercises(String username, String workoutName) {
    // TODO
    return null;
  }

  /**
   * Deletes an existing user from the users table.
   */
  public static void deleteUser() {
  }

  public static List<Integer> getFollowing(int id) {
    return null;
  }

  /**
   * Queries database for the user specified by input id
   * @param id user ID
   * @return AppUser object containing info about user with given id
   */
  public static AppUser getUser(int id) {
    return null;
  }


}
