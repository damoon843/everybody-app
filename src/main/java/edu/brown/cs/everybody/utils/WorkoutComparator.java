package edu.brown.cs.everybody.utils;

import edu.brown.cs.everybody.feedComponents.Workout;

import java.util.Comparator;

/**
 * Comparator for workouts.
 */
public class WorkoutComparator implements Comparator<Workout> {
  /**
   * Compares two workouts by time created.
   * @param w1 workout 1
   * @param w2 workout 2
   * @return -1 if workout 1 was created after workout 2, 1 if workout 1 created before workout 2,
   * 0 otherwise
   */
  public int compare(Workout w1, Workout w2)
  {
    return w2.getCreatedAt().compareTo(w1.getCreatedAt());
  }

}
