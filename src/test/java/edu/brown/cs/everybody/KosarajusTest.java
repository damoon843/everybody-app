//package edu.brown.cs.everybody;
//
//import edu.brown.cs.everybody.data.DataSourcePool;
//import edu.brown.cs.everybody.data.PostgresDatabase;
//import edu.brown.cs.everybody.utils.KosarajusAlgorithm;
//import org.junit.*;
//
//import static org.junit.Assert.*;
//
//import java.net.URISyntaxException;
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.SQLException;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
///**
// * Tests kosarajus.
// */
//public class KosarajusTest {
//  private static int user1id;
//  private static int user2id;
//  private static int user3id;
//  private static int user4id;
//  private static int user5id;
//
//  @BeforeClass
//  public static void setup() throws Exception {
//      DataSourcePool.configurePool();
//
//      // Insert data
//      List<Object> user1 = new ArrayList<>(Arrays.asList("a", "b", "user1a", "16", "Cardio", 0));
//      List<Object> user2 = new ArrayList<>(Arrays.asList("a", "b", "user2a", "15", "Cardio", 0));
//      List<Object> user3 = new ArrayList<>(Arrays.asList("a", "b", "user3a", "12", "Cardio", 0));
//      List<Object> user4 = new ArrayList<>(Arrays.asList("a", "b", "user4a", "13", "Cardio", 0));
//      List<Object> user5 = new ArrayList<>(Arrays.asList("a", "b", "user5a", "14", "Cardio", 0));
//
//      PostgresDatabase.insertUser(user1);
//      PostgresDatabase.insertUser(user2);
//      PostgresDatabase.insertUser(user3);
//      PostgresDatabase.insertUser(user4);
//      PostgresDatabase.insertUser(user5);
//
//      PostgresDatabase.insertFollow("user2a", "user4a");
//      PostgresDatabase.insertFollow("user4a", "user3a");
//      PostgresDatabase.insertFollow("user3a", "user2a");
//      PostgresDatabase.insertFollow("user3a", "user5a");
//  }
//
//  @AfterClass
//  public static void tearDown() throws SQLException, URISyntaxException {
//    // Remove inserted data
//    PostgresDatabase.setUpConnection();
//    Connection dbConn = PostgresDatabase.getConn();
//    String query = "DELETE FROM everybody_app.following WHERE user_id = ? OR user_id = ? OR user_id = ? OR user_id = ? OR user_id = ?";
//    PreparedStatement stmt = dbConn.prepareStatement(query);
//    stmt.setInt(1, user1id);
//    stmt.setInt(2, user2id);
//    stmt.setInt(3, user3id);
//    stmt.setInt(4, user4id);
//    stmt.setInt(5, user5id);
//    stmt.execute();
//
//    query = "DELETE FROM everybody_app.users WHERE id = ? OR id = ? OR id = ? OR id = ? OR id = ?";
//    stmt = dbConn.prepareStatement(query);
//    stmt.setInt(1, user1id);
//    stmt.setInt(2, user2id);
//    stmt.setInt(3, user3id);
//    stmt.setInt(4, user4id);
//    stmt.setInt(5, user5id);
//    stmt.execute();
//    stmt.close();
//    PostgresDatabase.tearDownConnection();
//    DataSourcePool.getDataSource().close();
//  }
//
//  @Test
//  public void testCreateRemove() throws URISyntaxException, SQLException {
//    KosarajusAlgorithm algo = new KosarajusAlgorithm();
//    user1id = PostgresDatabase.getUserID("user1a");
//    List<Integer> user1 = algo.findSCC(user1id);
//    assertEquals(user1.size(), 1);
//    user2id = PostgresDatabase.getUserID("user2a");
//    List<Integer> user2 = algo.findSCC(user2id);
//    assertEquals(user2.size(), 3);
//    user3id = PostgresDatabase.getUserID("user3a");
//    List<Integer> user3 = algo.findSCC(user3id);
//    assertEquals(user3.size(), 3);
//    user4id = PostgresDatabase.getUserID("user4a");
//    List<Integer> user4 = algo.findSCC(user4id);
//    assertEquals(user4.size(), 3);
//    user5id = PostgresDatabase.getUserID("user5a");
//    List<Integer> user5 = algo.findSCC(user5id);
//    assertEquals(user5.size(), 1);
//  }
//
//}
