package edu.brown.everybody;

import edu.brown.cs.everybody.feedComponents.Workout;
import edu.brown.cs.everybody.utils.WorkoutComparator;
import org.junit.Test;
import static org.junit.Assert.*;
import java.text.SimpleDateFormat;
import java.text.ParseException;

import java.util.Date;

/**
 * Tests WorkoutComparator
 */
public class WorkoutComparatorTest {
  @Test
  public void testCompare() throws ParseException {

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

    // Date 3 May 2001
    SimpleDateFormat localDateFormat = new SimpleDateFormat("YYYY-MM-DD HH:mm:ss");
    String oldstring = "2001-05-03 14:00:00";
    Date date = localDateFormat.parse(oldstring);
    Workout w3 = new Workout.WorkoutBuilder().workout_id(1).workout_name("mock1").
        created_at(date).duration(1).media_link("dummy").like_count(0).description("dummy").
        username("dummy").buildWorkout();

    // Date 3 May 2001 1.5 hours later
    SimpleDateFormat localDateFormat2 = new SimpleDateFormat("YYYY-MM-DD HH:mm:ss");
    String oldstring2 = "2001-05-03 15:30:00";
    Date date2 = localDateFormat.parse(oldstring2);
    Workout w4 = new Workout.WorkoutBuilder().workout_id(2).workout_name("mock2").
        created_at(date2).duration(1).media_link("dummy").like_count(2).description("dummy").
        username("dummy").buildWorkout();

    res = wc.compare(w3, w4);
    assertEquals(1, res);

    // Date 3 May 2001
    localDateFormat = new SimpleDateFormat("YYYY-MM-DD HH:mm:ss");
    oldstring = "2001-05-03 14:00:00";
    date = localDateFormat.parse(oldstring);
    Workout w5 = new Workout.WorkoutBuilder().workout_id(1).workout_name("mock1").
        created_at(date).duration(1).media_link("dummy").like_count(4).description("dummy").
        username("dummy").buildWorkout();

    // Date 3 May 2001 1.5 hours later but with 2 fewer likes
    localDateFormat2 = new SimpleDateFormat("YYYY-MM-DD HH:mm:ss");
    oldstring2 = "2001-05-03 15:30:00";
    date2 = localDateFormat.parse(oldstring2);
    Workout w6 = new Workout.WorkoutBuilder().workout_id(2).workout_name("mock2").
        created_at(date2).duration(1).media_link("dummy").like_count(2).description("dummy").
        username("dummy").buildWorkout();

    res = wc.compare(w5, w6);
    assertEquals(-1, res);
  }
}
