package edu.brown.cs.everybody.data;

import edu.brown.cs.everybody.utils.ErrorConstants;
import org.apache.commons.dbcp2.BasicDataSource;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;

/**
 * Wrapper class for connection pool.
 */
public class DataSourcePool {
  private static BasicDataSource ds = new BasicDataSource();

  /** Empty constructor to prevent instantiation */
  private DataSourcePool() {}

  // Static initialization block
  static {
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
    ds.setDriverClassName("org.postgresql.Driver");
    ds.setUrl(dbUrl);
    ds.setUsername(username);
    ds.setPassword(password);
    ds.setMinIdle(3);
    ds.setMaxIdle(6);
    ds.setMaxOpenPreparedStatements(30);
  }

  public static Connection getConnection() throws SQLException {
    return ds.getConnection();
  }
}
