package edu.brown.cs.everybody.data;

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

  /* Hidden constructor to avoid instantiation */
  private PostgresDatabase() {

  }

  /**
   * Singleton getter for PostgresDatabase.
   * @return single instance of PostgresDatabase.
   */
  public static PostgresDatabase getInstance() {
    if (singleInstance == null) {
      singleInstance = new PostgresDatabase();
    }
    return singleInstance;
  }

  /**
   * Establishes connection to pg DB.
   * @return connection to DB if successful, null if failed
   * @throws URISyntaxException when given improper URI
   * @throws SQLException when driver cannot retrieve conn
   */
  private static Connection getConnection() throws URISyntaxException, SQLException {
    // TODO: encode these details elsewhere
    String tempURI = "postgres://roifqtuewetfej:7d514e978ce5f83a75ca408a356cb5e5324a3657960f95a3533aeb93622c5" +
      "906@ec2-52-7-115-250.compute-1.amazonaws.com:5432/d97rt21a1m7m9k\n";

    URI dbUri = new URI(System.getenv(tempURI));
    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

    return DriverManager.getConnection(dbUrl, username, password);
  }
}
