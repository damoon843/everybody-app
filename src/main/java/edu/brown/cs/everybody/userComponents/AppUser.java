package edu.brown.cs.everybody.userComponents;

import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.KosarajusAlgorithm;

import java.sql.SQLException;
import java.util.*;

/**
 * Represents an app user.
 */
public class AppUser {
  private int userID;
  private String username;
  private Date createdAt;
  private String firstName;
  private String lastName;

  private List<Integer> following;
  private List<Integer> stronglyConnected;
  private PriorityQueue<Workout> workouts;

  // contains ID's of workouts already recommended on feed
  private Set<Integer> recentlyViewedFeed;

  private String workoutType;
  private Integer workoutDuration;

  /**
   * Constructor.
   * @param id userID
   * @param timeCreated time profile was created
   * @param fName user first name
   * @param lName user last name
   * @param workoutType workout type preference
   * @param workoutDuration workout duration preference
   */
  public AppUser(int id, String username, Date timeCreated, String fName, String lName, String workoutType,
                 Integer workoutDuration) throws SQLException {
    this.userID = id;
    this.createdAt = timeCreated;
    this.username = username;
    this.firstName = fName;
    this.lastName = lName;
    this.following = PostgresDatabase.getFollowing(this.userID);
    this.workouts = PostgresDatabase.getUserWorkouts(this.username);
    this.recentlyViewedFeed = PostgresDatabase.getRecentlyViewed(this.userID);
    this.workoutType = workoutType;
    this.workoutDuration = workoutDuration;
  }

  /**
   * Getter for ID.
   * @return user ID
   */
  public int getUserID() {
    return this.userID;
  }

  /**
   * Getter for Username.
   * @return username
   */
  public String getUsername() {
    return this.username;
  }

  /**
   * Getter for time created.
   * @return time created
   */
  public Date getCreatedAt() {
    return this.createdAt;
  }

  /**
   * Getter for first name.
   * @return first name
   */
  public String getFirstName() {
    return this.firstName;
  }

  /**
   * Getter for last name.
   * @return last name
   */
  public String getLastName() {
    return this.lastName;
  }

  /**
   * Getter for workouts user has posted.
   * @return priority queue of workouts ordered by recency posted
   */
  public PriorityQueue<Workout> getWorkouts() {
    // TODO
    return this.workouts;
  }

  /**
   * Adds a workout to pq of workouts.
   * @param w workout to add
   */
  public void addWorkout(Workout w) {
    // TODO
    this.workouts.add(w);
  }

  /**
   * Gets recently recommended workouts to user.
   * @return set of integers containing workout ID's
   */
  public Set<Integer> getRecentlyViewed() {
    return this.recentlyViewedFeed;
  }

  /**
   * Adds a workout to recently viewed set.
   * @param i workout ID to add.
   */
  public void addRecentlyViewed(int i) throws SQLException {
    this.recentlyViewedFeed.add(i);
    PostgresDatabase.addRecentlyViewed(this.userID, i);
  }

  /**
   * Gets users the user is following; used in home feed recommendation algorithm.
   * @return List of user ID's who user follows
   */
  public List<Integer> getFollowing() {
    return this.following;
  }

  //

  /**
   * Adds user to following list; called whenever server receives post request of an account
   * following another.
   * @param id follower id
   */
  public void addFollowing(int id) {
    this.following.add(id);
  }

  /**
   * Recalculates the strongly connected component of user using Kosaraju's algorithm.
   */
  private void updateStronglyConnected() throws SQLException {
    this.following = PostgresDatabase.getFollowing(this.userID);
    this.stronglyConnected = new KosarajusAlgorithm().findSCC(this.userID);
  }

  /**
   * Used in home feed algorithm to find strongly connected users.
   * @return List of user ID's
   */
  public List<Integer> getStronglyConnected() throws SQLException {
    updateStronglyConnected();
    return this.stronglyConnected;
  }

  /**
   * Gets workout type preference.
   * @return workout type
   */
  public String getWorkoutType() {
    return this.workoutType;
  }

  /**
   * Gets workout duration preference.
   * @return workout duration
   */
  public Integer getWorkoutDuration() {
    return this.workoutDuration;
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      userID,
      createdAt,
      firstName,
      lastName);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof AppUser) {
      AppUser user = (AppUser) obj;
      return user.userID == this.userID;
    } else {
      return false;
    }
  }
}
