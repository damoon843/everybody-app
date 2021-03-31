package edu.brown.cs.everybody.data;

import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Result;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import org.neo4j.driver.TransactionWork;

import static org.neo4j.driver.Values.parameters;

/**
 * Singleton class wrapping neo4j graph database and
 * its related cypher queries.
 */
public final class GraphDB implements AutoCloseable {
  private static Driver driver;
  private static GraphDB singleInstance = null;

  /* Hidden constructor to avoid instantiation */
  private GraphDB() {
  }

  /**
   * Singleton getter for GraphDB.
   * @return single instance of GraphDB.
   */
  public static GraphDB getInstance(String uri, String user, String password) {
    if (singleInstance == null) {
      singleInstance = new GraphDB();
      driver = GraphDatabase.driver( uri, AuthTokens.basic( user, password ));
    }
    return singleInstance;
  }

  @Override
  public void close() throws Exception
  {
    driver.close();
  }

  public void printGreeting( final String message )
  {
    try ( Session session = driver.session() )
    {
      String greeting = session.writeTransaction( new TransactionWork<String>()
      {
        @Override
        public String execute( Transaction tx )
        {
          Result result = tx.run( "CREATE (a:Greeting) " +
              "SET a.message = $message " +
              "RETURN a.message + ', from node ' + id(a)",
            parameters( "message", message ) );
          return result.single().get( 0 ).asString();
        }
      } );
      System.out.println( greeting );
    }
  }
}