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
    PostgresDatabase.setUpConnection();
    // Begin the server
    Server server = new Server(DEFAULT_PORT);
    System.out.println("THIS IS THE BEST APP EVER!");
  }

}
