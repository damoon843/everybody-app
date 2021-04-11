package edu.brown.cs.everybody.utils;

import edu.brown.cs.everybody.data.PostgresDatabase;
import edu.brown.cs.everybody.userComponents.AppUser;

import java.util.HashMap;
import java.util.Map;

/**
 * The Main class of our project. This is where execution begins.
 */
public final class Main {

  private static final int DEFAULT_PORT = 4567;
  private final String[] args;
  private static Map<Integer, AppUser> users = new HashMap<>();


  private Main(String[] args) {
    this.args = args;
  }

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) throws Exception {
    new Main(args).run();
  }

  private void run() throws Exception {
    PostgresDatabase.getInstance();
    // Begin the server
    Server server = new Server(DEFAULT_PORT);
    System.out.println("THIS IS THE BEST APP EVER!");
  }

  /**
   * Getter for static users map.
   * @return Map of user IDs to users already created.
   */
  public static Map<Integer, AppUser> getUsers() {
    return Main.users;
  }

  /**
   * Adds one AppUser to users map.
   * @param id id of user
   * @param user AppUser object to add
   */
  public static void addUser(int id, AppUser user) {
    Main.users.put(id, user);
  }
}
