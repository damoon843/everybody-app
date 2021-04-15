package edu.brown.everybody;

import edu.brown.cs.everybody.data.DataSourcePool;
import edu.brown.cs.everybody.data.PostgresDatabase;
import org.junit.*;

import static org.junit.Assert.*;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Tests database calls.
 */
public class PostgresDatabaseTest {
  Connection conn;

  // TODO: ensure all connections are killed
  /**
   * Helper method to connect to DB.
   * @return initialized statement
   */
  public Statement connect() throws URISyntaxException, SQLException {
    PostgresDatabase.setUpConnection();
    conn = PostgresDatabase.getConn();
    Statement stmt = conn.createStatement();
    return stmt;
  }

  @BeforeClass
  public static void setUp() {
    DataSourcePool.configurePool();
  }

  @AfterClass
  public static void tearDown() throws SQLException, URISyntaxException {
    // Remove inserted data
    PostgresDatabase.setUpConnection();
    Statement stmt = PostgresDatabase.getConn().createStatement();

    String query = "DELETE FROM everybody_app.users WHERE username = 'mock1';";
    int rowsAffected = stmt.executeUpdate(query);
    assertEquals(1, rowsAffected);

    stmt.close();
    PostgresDatabase.tearDownConnection();
    DataSourcePool.getDataSource().close();
  }

  @Test
  public void testCreateRemove() throws URISyntaxException, SQLException {
    PostgresDatabase.setUpConnection();
    Connection conn = PostgresDatabase.getConn();
    assertNotNull(conn);

    PostgresDatabase.tearDownConnection();
    assertTrue(conn.isClosed());
  }

  @Test
  public void testInsertUser() throws SQLException, URISyntaxException {
    List<Object> mockData = new ArrayList<>(Arrays.asList("mock", "name", "mock1", "123", "Cardio", 60));
    boolean status = false;

    PostgresDatabase.insertUser(mockData);
    Statement stmt = connect();

    // Validate query
    String query = "SELECT EXISTS(SELECT 1 FROM everybody_app.users WHERE username = 'mock1');";
    ResultSet result = stmt.executeQuery(query);
    while(result.next()) {
      status = result.getBoolean("exists");
    }
    assertTrue(status);

    // Tear down resources
    stmt.close();
    PostgresDatabase.tearDownConnection();
  }

  @Test
  public void testGetUserInfo() throws URISyntaxException, SQLException {
    List<Object> results = PostgresDatabase.getUserInfo("mock1");
    assertEquals("mock", results.get(0));
    assertEquals("name", results.get(1));
    assertEquals(60, results.get(3));
  }
}
