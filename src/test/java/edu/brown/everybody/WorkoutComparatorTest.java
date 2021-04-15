package edu.brown.everybody;

import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Date;

/**
 * Tests WorkoutComparator
 */
public class WorkoutComparatorTest {
  @Test
  public void testCompare() {

    // Date 3 May 2001
    Workout w1 = new Workout.WorkoutBuilder().workout_id(1).workout_name("mock1").
      created_at(new Date(988888888888L)).duration(1).media_link("dummy").like_count(0).description("dummy").
      username("dummy").buildWorkout();

    // Date 8 September 2001
    Workout w2 = new Workout.WorkoutBuilder().workout_id(2).workout_name("mock2").
      created_at(new Date(999988888888L)).duration(1).media_link("dummy").like_count(0).description("dummy").
      username("dummy").buildWorkout();

    WorkoutComparator wc = new WorkoutComparator();
    int res = wc.compare(w1, w2);
    assertEquals(1, res);
  }
}
