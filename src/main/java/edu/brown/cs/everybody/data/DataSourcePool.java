package edu.brown.cs.everybody.data;

import edu.brown.cs.everybody.utils.ErrorConstants;
import org.apache.commons.dbcp2.BasicDataSource;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Wrapper class for connection pool.
 */
public class DataSourcePool {
  private static BasicDataSource ds = new BasicDataSource();

  /** Empty constructor to prevent instantiation */
  private DataSourcePool() {}

  /**
   * Initializes BasicDataSource.
   */
  public static void configurePool() {
    // Retrieve DB credentials
    URI dbUri = null;
    try {
      dbUri = new URI(System.getenv("DATABASE_URL"));
    } catch (URISyntaxException e) {
      System.out.println(ErrorConstants.ERROR_DATABASE_SETUP);
    }
    String username = dbUri.getUserInfo().split(":")[0];
    String password = dbUri.getUserInfo().split(":")[1];
    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath() + "?sslmode=require";

    // Configure DataSource
    // NOTE: Heroku Postgres free tier allows 20 connections max
    ds.setDriverClassName("org.postgresql.Driver");
    ds.setUrl(dbUrl);
    ds.setUsername(username);
    ds.setPassword(password);
    ds.setMinIdle(3);
    ds.setMaxIdle(6);
    ds.setDefaultQueryTimeout(40);
    ds.setRemoveAbandonedOnBorrow(true); // Remove abandoned connections
    ds.setRemoveAbandonedTimeout(10); // Timeout before abandoned connections removed
    ds.setMaxOpenPreparedStatements(30);
    ds.setPoolPreparedStatements(true);
    ds.setClearStatementPoolOnReturn(true); // Clear pool of statements when returning connection

    // Test connection before proceeding with action
    ds.setTestOnBorrow(true);
    ds.setTestOnReturn(true);
    ds.setTestOnCreate(true);
    ds.setValidationQuery("SELECT 1;");
  }

  /**
   * Retrieves connection from pool.
   * @return Connection
   * @throws SQLException if connection cannot be retrieved
   */
  public static Connection getConnection() throws SQLException {
    return ds.getConnection();
  }

  /**
   * Getter for BasicDataSource.
   * @return BasicDataSource
   */
  public static BasicDataSource getDataSource() {
    return ds;
  }
}
