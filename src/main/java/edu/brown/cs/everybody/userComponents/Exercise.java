package edu.brown.cs.everybody.userComponents;

import java.net.URL;
import java.util.Date;

/**
 * Encapsulates an Exercise object.
 */
public class Exercise {
    private int exercise_id;
    private int workout_id;
    private int user_id;
    private Date created_at;
    private String description;
    private String exercise_type;
    private String exercise_target_area;
    private Double duration;
    private URL media_link;
    private int next; // Stores ID of next exercise (in workout)


  /**
     * Constructor for Exercise
     * @param builder hydrated builder object
     */
    public Exercise(builder) {
      this.workout_id = builder._workout_id;
      this.user_id = builder._user_id;
      this.created_at = builder._created_at;
      this.description = builder._description;
      this.workout_type = builder._workout_type;
      this.duration = builder._duration;
      this.media_link = builder._media_link;
      this.like_count = builder._like_count;
    }

  /**
   * Getter for exercise ID.
   * @return
   */
  public int getExerciseId() {
      return this.exercise_id;

    /**
     * Getter for workout ID.
     * @return workout ID
     */
    public int getWorkoutId() {
      return this.workout_id;
    }

    /**
     * Getter for user ID that posted workout.
     * @return user ID
     */
    public int getUserId() {
      return this.user_id;
    }

    /**
     * Getter for time workout posted.
     * @return timestamp
     */
    public Date getCreatedAt() {
      return this.created_at;
    }

    /**
     * Getter for workout description.
     * @return description
     */
    public String getDescription() {
      return this.description;
    }

    /**
     * Getter for workout type.
     * @return workout type
     */
    public String getWorkoutType() {
      return this.workout_type;
    }

    /**
     * Getter for workout duration
     * @return duration
     */
    public Double getDuration() {
      return this.duration;
    }

    /**
     * Getter for media link.
     * @return media link
     */
    public URL getMediaLink() {
      return this.media_link;
    }

    /**
     * Getter for like count.
     * @return like count
     */
    public Long getLikeCount() {
      return this.like_count;
    }

    /**
     * Inner builder class for Workouts. Uses the Builder Design pattern.
     */
    public static class WorkoutBuilder {
      private int _workout_id;
      private int _user_id;
      private Date _created_at;
      private String _description;
      private String _workout_type;
      private Double _duration;
      private URL _media_link;
      private Long _like_count;

      /* Empty constructor */
      public WorkoutBuilder() {}

      /**
       * Final construction of Workout.
       * @return Workout object
       */
      public edu.brown.cs.everybody.userComponents.Workout buildWorkout() {
        return new edu.brown.cs.everybody.userComponents.Workout(this);
      }

      /**
       * Sets workout_id field.
       * @param id workout id
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder workout_id(int id) {
        this._workout_id  = id;
        return this;
      }

      /**
       * Sets user_id field.
       * @param id user id
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder user_id(int id) {
        this._user_id  = id;
        return this;
      }

      /**
       * Sets created_at field.
       * @param timestamp time created
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder created_at(Date timestamp) {
        this._created_at = timestamp;
        return this;
      }

      /**
       * Sets description field.
       * @param text description of workout
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder description(String text) {
        this._description  = text;
        return this;
      }

      /**
       * Sets workout type field.
       * @param type workout type
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder workout_type(String type) {
        this._workout_type  = type;
        return this;
      }

      /**
       * Sets duration field.
       * @param length workout length
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder duration(Double length) {
        this._duration  = length;
        return this;
      }

      /**
       * Sets media link field
       * @param link URL to workout thumbnail
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder media_link(URL link) {
        this._media_link = link;
        return this;
      }

      /**
       * Sets like count field.
       * @param count workout type
       * @return WorkoutBuilder object
       */
      public edu.brown.cs.everybody.userComponents.Workout.WorkoutBuilder like_count(Long count) {
        this._like_count  = count;
        return this;
      }
    }
  }

}
