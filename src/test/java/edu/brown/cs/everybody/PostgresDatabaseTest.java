package edu.brown.cs.everybody;

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

  /**
   * Helper method to disconnect from DB.
   * @param stmt initialilzed statement
   */
  public void disconnect(Statement stmt) throws SQLException {
    // Tear down resources
    stmt.close();
    PostgresDatabase.tearDownConnection();
  }

  @BeforeClass
  public static void setUp() throws SQLException, URISyntaxException {
    DataSourcePool.configurePool();

    // Insert data
    List<Object> mockData = new ArrayList<>(Arrays.asList("mock", "name", "mock1", "123", "Cardio", 60));
    PostgresDatabase.insertUser(mockData);
    PostgresDatabase.insertUserExercise("mock1", "mockExercise1", "dummy",
      15, new ArrayList<String>(Arrays.asList("body1", "body2")), "text");
    PostgresDatabase.insertUserWorkout(60, "dummy", 0, "text", "mock1",
      "mockWorkout1", new ArrayList<>(Arrays.asList(1,2)));
  }

  @AfterClass
  public static void tearDown() throws SQLException, URISyntaxException {
    // Remove inserted data
    PostgresDatabase.setUpConnection();
    Statement stmt = PostgresDatabase.getConn().createStatement();

    String query = "DELETE FROM everybody_app.exercises WHERE username = 'mock1' AND exercise_name = 'mockExercise1';";
    stmt.executeUpdate(query);
    query = "DELETE FROM everybody_app.users WHERE username = 'mock1';";
    stmt.executeUpdate(query);
    query = "DELETE FROM everybody_app.workouts WHERE username = 'mock1';";
    stmt.executeUpdate(query);

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
    boolean status = false;
    Statement stmt = connect();

    // Validate query
    String query = "SELECT EXISTS(SELECT 1 FROM everybody_app.users WHERE username = 'mock1');";
    ResultSet result = stmt.executeQuery(query);
    while(result.next()) {
      status = result.getBoolean("exists");
    }
    assertTrue(status);

    disconnect(stmt);
  }

  @Test
  public void testGetUserInfo() throws URISyntaxException, SQLException {
    List<Object> results = PostgresDatabase.getUserInfo("mock1");
    assertEquals("mock", results.get(0));
    assertEquals("name", results.get(1));
    assertEquals(60, results.get(3));
  }

  @Test
  public void testInsertUserExercise() throws SQLException, URISyntaxException {
    boolean status = false;
    Statement stmt = connect();

    // Validate query
    String query = "SELECT EXISTS(SELECT 1 FROM everybody_app.exercises WHERE username = 'mock1' AND exercise_name = 'mockExercise1');";
    ResultSet result = stmt.executeQuery(query);
    while(result.next()) {
      status = result.getBoolean("exists");
    }
    assertTrue(status);

    disconnect(stmt);
  }

  @Test
  public void testInsertWorkout() throws SQLException, URISyntaxException {
    boolean status = false;
    Statement stmt = connect();

    // Validate query
    String query = "SELECT EXISTS(SELECT 1 FROM everybody_app.workouts WHERE username = 'mock1' AND workout_name = 'mockWorkout1');";
    ResultSet result = stmt.executeQuery(query);
    while(result.next()) {
      status = result.getBoolean("exists");
    }
    assertTrue(status);

    disconnect(stmt);
  }
}
