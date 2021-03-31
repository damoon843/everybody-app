package edu.brown.cs.everybody.userComponents;

/**
 * Represents an app user.
 */
public class AppUser {
  private int userID;
  private double createdAt;
  private String firstName;
  private String lastName;
  // TODO: consider adding user preferences info here

  public AppUser(int id, double timeCreated, String fName, String lName) {
    this.userID = id;
    this.createdAt = timeCreated;
    this.firstName = fName;
    this.lastName = lName;
  }

  // TODO: add getters here
}
