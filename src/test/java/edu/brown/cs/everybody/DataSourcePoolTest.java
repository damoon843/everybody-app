package edu.brown.cs.everybody;

import edu.brown.cs.everybody.data.DataSourcePool;
import static org.junit.Assert.*;

import org.apache.commons.dbcp2.BasicDataSource;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Tests DataSourcePool.
 */
public class DataSourcePoolTest {
  @BeforeClass
  public static void setUp() throws SQLException {
    DataSourcePool.configurePool();
    BasicDataSource ds = DataSourcePool.getDataSource();
    ds.start();
  }

  @AfterClass
  public static void tearDown() throws SQLException {
    BasicDataSource ds = DataSourcePool.getDataSource();
    ds.close();
  }

  @Test
  public void testConfigurePool() throws SQLException {
    BasicDataSource ds = DataSourcePool.getDataSource();

    // Test data source properties
    assertNotNull(ds);
    assertTrue(ds.getTestOnBorrow());
    assertEquals(4, ds.getMinIdle());
  }

  @Test
  public void testPoolConnection() throws SQLException {
    BasicDataSource ds = DataSourcePool.getDataSource();

    // Test conn set-up
    Connection conn = DataSourcePool.getConnection();
    assertNotNull(conn);

    // Test conn functionality
    System.out.println(conn.getSchema());
    assertEquals("public", conn.getSchema());
    Statement stmt = conn.createStatement();
    boolean status = stmt.execute("SELECT 1;");
    stmt.close();
    assertTrue(status);

    // Test conn tear-down
    conn.close();
    assertTrue(conn.isClosed());
  }
}
