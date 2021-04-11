package edu.brown.cs.everybody.utils;

import edu.brown.cs.everybody.data.PostgresDatabase;

import java.util.*;

/**
 * Implements Kosaraju's algorithm to determine strongly connected users containing a given user in a graph.
 * https://stackoverflow.com/questions/47996115/finding-a-strongly-connected-component-with-a-desired-node-in-
 * it#:~:text=To%20find%20the%20strongly%20connected,which%20x%20can%20be%20reached.
 */
public class KosarajusAlgorithm {

  /**
   * Constructor for algorithm.
   */
  public KosarajusAlgorithm() { }

  // Psuedocode:
  // BFS from start user through following list
  // as you traverse, add to reverseEdges hashmap and firstRun
  // BFS starting from startUserID in hashmap
  // add to secondRun
  // return set1.retainAll(set2)

  /**
   * Finds the strongly connected component in the graph in database the given user id is part of.
   * @param user userID we are interested in
   * @return list containing ID's of users in same strongly connected component in graph
   */
  public List<Integer> findSCC(int user) {
    // Data structures for Kosaraju's Algorithm.
    Map<Integer, List<Integer>> reverseRelations = new HashMap<>();
    Set<Integer> firstRun = new HashSet<>();
    Set<Integer> secondRun = new HashSet<>();

    // Data Structures for BFS.
    Queue<Integer> queue = new LinkedList<>();
    Set<Integer> visited = new HashSet<>();

    // Start of first BFS.
    queue.add(user);
    visited.add(user);
    firstRun.add(user);
    while (!queue.isEmpty()) {
      int startUser = queue.poll();
      List<Integer> following = PostgresDatabase.getFollowing(user);
      if (following != null) {
        for (int followingUser: following) {
          if (!visited.contains(followingUser)) {
            queue.add(followingUser);
            visited.add(followingUser);
            firstRun.add(followingUser);
            if (reverseRelations.containsKey(followingUser)) {
              reverseRelations.get(followingUser).add(startUser);
            } else {
              List<Integer> lst = new ArrayList<>();
              lst.add(startUser);
              reverseRelations.put(followingUser, lst);
            }
          }
        }
      }
    }

    // Start of second BFS using reversed "edges".
    queue = new LinkedList<>();
    visited = new HashSet<>();

    queue.add(user);
    visited.add(user);
    secondRun.add(user);
    while (!queue.isEmpty()) {
      int startUser = queue.poll();
      List<Integer> following = reverseRelations.get(startUser);
      if (following != null) {
        for (int followingUser: following) {
          if (!visited.contains(followingUser)) {
            queue.add(followingUser);
            visited.add(followingUser);
            secondRun.add(followingUser);
          }
        }
      }
    }

    // Returns intersection of both BFS results.
    firstRun.retainAll(secondRun);
    return new ArrayList<>(firstRun);
  }
}