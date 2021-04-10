package edu.brown.cs.everybody.userComponents;

import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.utils.KosarajusAlgorithm;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

  // contains ID's of workouts already recommended on feed
  private Set<Integer> recentlyViewedFeed = new HashSet<>();

  // TODO: review these preferences
  private String workoutType;

  public AppUser(int id, Date timeCreated, String fName, String lName) {
    this.userID = id;
    this.createdAt = timeCreated;
    this.firstName = fName;
    this.lastName = lName;
    this.following = PostgresDatabase.getFollowing(this.userID); // CHANGE?
    // TODO: add user preferences fields here
  }

  // TODO: add getter javadocs here
  public int getUserID() {
    return this.userID;
  }

  public String getUsername() {
    return this.username;
  }

  public Date getCreatedAt() {
    return this.createdAt;
  }

  public String getFirstName() {
    return this.firstName;
  }

  public String getLastName() {
    return this.lastName;
  }

  // used in home feed recommendation when not enough people in stronglyConnectedComponent
  public List<Integer> getFollowing() {
    return this.following;
  }

  // used whenever main receives post request of an account following another
  public void addFollowing(int id) {
    this.following.add(id);
  }

  // updates stronglyConnectedComponent stored
  private void updateStronglyConnected() {
    this.following = PostgresDatabase.getFollowing(this.userID);
    this.stronglyConnected = new KosarajusAlgorithm().findSCC(this.userID);
  }

  // used in home feed recommendation to recommend new workouts
  public List<Integer> getStronglyConnected() {
    updateStronglyConnected();
    return this.stronglyConnected;
  }

  public String getWorkoutType() {
    return this.workoutType;
  }
}
