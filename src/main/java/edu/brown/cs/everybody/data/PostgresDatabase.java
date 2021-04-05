package edu.brown.cs.everybody.data;

import edu.brown.cs.everybody.userComponents.AppUser;
import edu.brown.cs.everybody.utils.ErrorConstants;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

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
   * Inserts a new user into the users table.
   * @param user new user to insert
   */
  public static void insertUser(AppUser user) {
  }

  /**
   * Deletes an existing user from the users table.
   */
  public static void deleteUser() {
  }
}