package edu.brown.cs.everybody.userComponents;

import java.util.Date;

/**
 * Represents an app user.
 */
public class AppUser {
  private int userID;
  private String username;
  private Date createdAt;
  private String firstName;
  private String lastName;

  // TODO: review these preferences
  private String workoutType;

  public AppUser(int id, Date timeCreated, String fName, String lName) {
    this.userID = id;
    this.createdAt = timeCreated;
    this.firstName = fName;
    this.lastName = lName;

    // TODO: add user preferences fields here
  }

  // TODO: add getters here
}
