package edu.brown.cs.everybody.utils;

import edu.brown.cs.everybody.feedComponents.Workout;

import java.util.Comparator;

/**
 * Comparator for workouts.
 */
public class WorkoutComparator implements Comparator<Workout> {
  /**
   * Compares two workouts by time created and like count.
   * @param w1 workout 1
   * @param w2 workout 2
   * @return -1 if workout 1 was ranked higher than workout 2, 1 if workout 1 ranked lower than workout 2,
   * 0 otherwise
   */
  public int compare(Workout w1, Workout w2)
  {
    // time difference in milliseconds
    double diff = w2.getCreatedAt().getTime() - w1.getCreatedAt().getTime();
    // difference in hours
    double difference = (diff / (1000.0 * 60 * 60));
    // like count difference
    double likeDiff = w2.getLikeCount() - w1.getLikeCount();

    // 24 hours passed = 5 likes
    difference = difference / 24;
    likeDiff = likeDiff / 5;
    double netDiff = difference + likeDiff;

    if (netDiff == 0) {
      return 0;
    } else if (netDiff < 0) {
      return -1;
    } else {
      return 1;
    }
  }

}
