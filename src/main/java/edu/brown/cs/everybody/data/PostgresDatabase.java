package edu.brown.cs.everybody.data;

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
  // TODO: look into connection pooling
  // main.java concurrency (stretch feature)
  // cache of users, getUser/getFollowers query called in constructor so also cached?


  /* Hidden constructor to avoid instantiation */
  private PostgresDatabase() {
  }

  /**
   * Establishes connection to pg DB.
   * @throws URISyntaxException when given improper URI
   * @throws SQLException when driver cannot retrieve conn
   */
  public static void setUpConnection() throws URISyntaxException, SQLException {
    try {
      URI dbUri = new URI(System.getenv("DATABASE_URL"));

      String username = dbUri.getUserInfo().split(":")[0];
      String password = dbUri.getUserInfo().split(":")[1];
      String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";
      dbConn = DriverManager.getConnection(dbUrl, username, password);
    } catch (Exception ex) {
      System.out.println(ErrorConstants.ERROR_DATABASE_SETUP);
    }
  }

  /**
   * Tears down connection to pg DB.
   */
  public static void tearDownConnection() {
    if (dbConn != null) {
      try {
        dbConn.close();
      } catch(SQLException ex) {
        System.out.println(ErrorConstants.ERROR_DATABASE_CLOSE);
      }
    }
  }

  /**
   * Inserts a new user into the users table (sign-up).
   * @param data list of user-related data to insert
   */
  public static void insertUser(List<Object> data) throws SQLException, URISyntaxException {
    setUpConnection();
    System.out.println(dbConn);
    System.out.println("IN INSERTUSER");
    String insertString = Queries.insertUserQuery();

    // Insert into users table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setString(1, (String) data.get(0));
      stmt.setString(2, (String) data.get(1));
      stmt.setString(3, (String) data.get(2));
      stmt.setString(4, (String) data.get(3));
      stmt.execute();
      System.out.println("EXECUTED INSERT QUERY");
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }

    // Insert into user_preferences table
    insertString = Queries.insertUserPreferencesQuery();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setString(1, (String) data.get(4));
      stmt.setString(2, (String) data.get(5));
      stmt.execute();
      System.out.println("EXECUTED PREFERENCES QUERY");
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
  }

  /**
   * Retrieves an existing user's information with username.
   * @param username username
   * @return list of user info
   */
  public static List<Object> getUserInfo(String username) throws SQLException, URISyntaxException {
    setUpConnection();
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
      tearDownConnection();
      return result;
    }
  }

  /**
   * Retrieves a user's uploaded workouts.
   * @param username username
   * @return list of Workout objects
   */
  public static PriorityQueue<Workout> getUserWorkouts(String username) throws SQLException, URISyntaxException {
    setUpConnection();
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
      tearDownConnection();
      return pq;
    }
  }

  /**
   * Retrieves a user's exercises within a specific workout.
   * @param username username
   * @param workoutName workout name
   * @return list of Exercise objects
   */
  public static Map<Integer, List<Object>> getUserExercises(String username, String workoutName) throws SQLException, URISyntaxException {
    setUpConnection();
    String queryString = Queries.getExercisesFromWorkout();
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
      Map<Integer, List<Object>> results = new HashMap<>();

      try (PreparedStatement stmt2 = dbConn.prepareStatement(queryString)) {
        for (int id : exerciseIds) {
          stmt2.setInt(1, id);

          try (ResultSet res = stmt2.executeQuery()) {
            while (res.next()) {
              String exerciseName = res.getString("exercise_name");
              String mediaLink = res.getString("media_link");
              Integer duration = res.getInt("duration");
              Array tagArray = res.getArray("tags");
              String description = res.getString("description");
              Date createdAt = res.getDate("created_at");

              // Convert Date obj to milliseconds
              Long time = createdAt.getTime();

              // Cast java.sql array to java.utils array
              String[] tags = (String[]) tagArray.getArray();

              List<Object> tempList = new ArrayList<>(Arrays.asList(exerciseName, mediaLink, duration, tags, description, time));
              results.put(id, tempList);
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
      tearDownConnection();
      return results;
    }
  }

  /**
   * Inserts an uploaded exercise
   * @param username username
   * @param exerciseName exercise name
   * @param mediaLink media URL
   * @param duration length of exercise (seconds)
   * @param tags list of tags
   * @param description description
   */
  public static void insertUserExercise(String username, String exerciseName, String mediaLink, Integer duration,
                                        List<String> tags, String description) throws SQLException, URISyntaxException {
    setUpConnection();
    String insertString = Queries.insertExercise();

    // Insert into exercises table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, duration);
      stmt.setString(2, mediaLink);
      stmt.setString(3, description);
      stmt.setString(4, username);
      stmt.setString(5, exerciseName);
      stmt.setArray(6, (Array) tags);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
  }

  /**
   * Helper method for insertUserWorkout. Retrieves exercise ID.
   */
  public static Integer getExerciseId(String username, String exerciseName) throws SQLException, URISyntaxException {
    setUpConnection();
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
    tearDownConnection();
    return exerciseId;
  }


  /**
   * Inserts an uploaded workout.
   * @param duration length of workout
   * @param mediaLink media link
   * @param totalLikes likes of workout
   * @param description description of workout
   * @param username username of poster
   * @param workoutName workout name
   * @param exerciseIds list of exercises in the workout
   */
  public static void insertUserWorkout(Integer duration, String mediaLink, Integer totalLikes,
                                       String description, String username, String workoutName,
                                       List<Integer> exerciseIds) throws SQLException, URISyntaxException {
    setUpConnection();
    String insertString = Queries.insertWorkout();

    // Insert into workouts table
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, duration);
      stmt.setString(2, mediaLink);
      stmt.setInt(3, totalLikes);
      stmt.setArray(4, (Array) exerciseIds);
      stmt.setString(5, description);
      stmt.setString(6, username);
      stmt.setString(7, workoutName);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
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
  public static List<Integer> getFollowing(int id) throws SQLException, URISyntaxException {
    setUpConnection();
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
    tearDownConnection();
    return following;
  }

  /**
   * Queries database for the user specified by input id and encapsulates with a AppUser.
   * @param id user ID
   * @return AppUser object containing info about user with given id
   */
  public static AppUser getUser(int id) throws SQLException, URISyntaxException {
    setUpConnection();
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
      tearDownConnection();
      return user;
    }
  }

  /**
   * Adds recently viewed workout recommended to a user to viewed_workouts table.
   * @param user user id
   * @param workout workout id
   */
  public static void addRecentlyViewed(int user, int workout) throws SQLException, URISyntaxException {
    setUpConnection();
    String insertString = Queries.insertViewedWorkout();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, user);
      stmt.setInt(2, workout);
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
  }

  /**
   * Gets all the recently viewed workout Ids for a given user.
   * @param userID user id
   * @return set of workout ids
   *
   */
  public static Set<Integer> getRecentlyViewed(int userID) throws SQLException, URISyntaxException {
    setUpConnection();
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
    tearDownConnection();
    return workouts;
  }

  /**
   * Gets user id associated with a username.
   * @param username username
   * @return userID
   */
  public static int getUserID(String username) throws SQLException, URISyntaxException {
    setUpConnection();
    String queryString = Queries.getUserID();
    int userID = -1;
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1, username);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          userID = res.getInt("id");
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
    return userID;
  }

  /**
   * Adds a following relationship to following table.
   * @param username user
   * @param following new user to follow
   */
  public static void insertFollow(String username, String following) throws SQLException, URISyntaxException {
    setUpConnection();
    String insertString = Queries.insertFollow();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, getUserID(username));
      stmt.setInt(2, getUserID(following));
      stmt.execute();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
  }


  /**
   * Retrieves exercises for exercises page (100 at a time)
   * @return list of exercises to display
   */
  public static Map<Integer, List<Object>> getExercises() throws SQLException, URISyntaxException {
    setUpConnection();
    String queryString = Queries.getPublicExercises();
    Map<Integer, List<Object>>  results = new HashMap<>();

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Integer exerciseID = res.getInt("exercise_id");
          Date createdAt = res.getDate("created_at");
          Integer duration = res.getInt("duration");
          String mediaLink = res.getString("mediaLink");
          String description = res.getString("description");
          Array sqlTags = res.getArray("tags");
          String username = res.getString("username");
          String exerciseName = res.getString("exercise_name");

          // Convert Date obj to milliseconds
          Long time = createdAt.getTime();

          // Cast java.sql array to java.utils array
          String[] tags = (String[]) sqlTags.getArray();

          List<Object> tempList = new ArrayList<>(Arrays.asList(time, duration, mediaLink, description, tags,
            username, exerciseName));
          results.put(exerciseID, tempList);
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
    return results;
  }

  /**
   * Removes a following relation from following table.
   * @param username user's username
   * @param following user currently being followed's username
   * @throws SQLException
   */
  public static void removeFollow(String username, String following) throws SQLException, URISyntaxException {
    setUpConnection();
    String insertString = Queries.removeFollow();
    try (PreparedStatement stmt = dbConn.prepareStatement(insertString)) {
      stmt.setInt(1, getUserID(username));
      stmt.setInt(2, getUserID(following));
      stmt.execute();
      tearDownConnection();
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Checks if users table contains user with input username and password.
   * @param username username
   * @param password password
   * @return -1 if false, 1 if true
   */
  public static int loginUser(String username, String password) throws SQLException, URISyntaxException {
    setUpConnection();
    String queryString = Queries.checkLogin();
    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1,username);
      stmt.setString(2, password);
      try (ResultSet res = stmt.executeQuery()) {
        if (res.next()) {
          tearDownConnection();
          return 1;
        }
      }
      tearDownConnection();
      return -1;
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
  }

  /**
   * Retrieves exercises which are similar to a query (up to 20).
   * @return list of exercises to display
   */
  public static Map<Integer, List<Object>> getSimilarExercises(String query) throws SQLException, URISyntaxException {
    setUpConnection();
    String queryString = Queries.getSimilarExercises();
    Map<Integer, List<Object>>  results = new HashMap<>();

    try (PreparedStatement stmt = dbConn.prepareStatement(queryString)) {
      stmt.setString(1,query);
      try (ResultSet res = stmt.executeQuery()) {
        while (res.next()) {
          Integer exerciseID = res.getInt("exercise_id");
          Date createdAt = res.getDate("created_at");
          Integer duration = res.getInt("duration");
          String mediaLink = res.getString("mediaLink");
          String description = res.getString("description");
          Array sqlTags = res.getArray("tags");
          String username = res.getString("username");
          String exerciseName = res.getString("exercise_name");

          // Convert Date obj to milliseconds
          Long time = createdAt.getTime();

          // Cast java.sql array to java.utils array
          String[] tags = (String[]) sqlTags.getArray();

          List<Object> tempList = new ArrayList<>(Arrays.asList(time, duration, mediaLink, description, tags,
              username, exerciseName));
          results.put(exerciseID, tempList);
        }
      }
    } catch (SQLException ex) {
      System.out.println(ErrorConstants.ERROR_QUERY_EXCEPTION);
      throw new SQLException(ex.getMessage());
    }
    tearDownConnection();
    return results;
  }
}
