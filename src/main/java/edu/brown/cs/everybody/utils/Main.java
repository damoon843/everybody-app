package edu.brown.cs.everybody.utils;

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
  public static void main(String[] args) {
    new Main(args).run();
  }

  private void run() {
    Server server = new Server(DEFAULT_PORT);
    System.out.println("THIS IS THE BEST APP EVER!");
  }
}
