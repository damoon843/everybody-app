package edu.brown.cs.everybody.feedComponents;


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
  private String target_area;
  private Double duration;
  private URL media_link;
  // TODO: need this?
  private int next; // Stores ID of next exercise (in workout)

  /**
   * Constructor for Exercise
   *
   * @param builder hydrated builder object
   */
  public Exercise(ExerciseBuilder builder) {
    this.exercise_id = builder._exercise_id;
    this.workout_id = builder._workout_id;
    this.user_id = builder._user_id;
    this.created_at = builder._created_at;
    this.description = builder._description;
    this.exercise_type = builder._exercise_type;
    this.target_area = builder._target_area;
    this.duration = builder._duration;
    this.media_link = builder._media_link;
    this.next = builder._next;
  }

  /**
   * Getter for exercise ID.
   *
   * @return exercise ID
   */
  public int getExerciseId() {
    return this.exercise_id;
  }

  /**
   * Getter for workout ID.
   *
   * @return workout ID
   */
  public int getWorkoutId() {
    return this.workout_id;
  }

  /**
   * Getter for user ID that posted workout.
   *
   * @return user ID
   */
  public int getUserId() {
    return this.user_id;
  }

  /**
   * Getter for time exercise posted.
   *
   * @return timestamp
   */
  public Date getCreatedAt() {
    return this.created_at;
  }

  /**
   * Getter for exercise description.
   *
   * @return description
   */
  public String getDescription() {
    return this.description;
  }

  /**
   * Getter for exercise type.
   *
   * @return exercise type
   */
  public String getExerciseType() {
    return this.exercise_type;
  }

  /**
   * Getter for exercise target area
   *
   * @return exercise target area
   */
  public String getExerciseTargetArea() {
    return this.target_area;
  }

  /**
   * Getter for duration.
   *
   * @return duration
   */
  public Double getDuration() {
    return this.duration;
  }

  /**
   * Getter for media link.
   *
   * @return media link
   */
  public URL getMediaLink() {
    return this.media_link;
  }

  /**
   * Getter for ID of next exercise (in workout).
   *
   * @return next exercise ID (null if no next)
   */
  public int getNext() {
    return this.next;
  }

  /**
   * Inner builder class for Exercises. Uses the Builder Design pattern.
   */
  public static class ExerciseBuilder {
    private int _exercise_id;
    private int _workout_id;
    private int _user_id;
    private Date _created_at;
    private String _description;
    private String _exercise_type;
    private String _target_area;
    private Double _duration;
    private URL _media_link;
    private int _next;

    /* Empty constructor */
    public ExerciseBuilder() {
    }

    /**
     * Final construction of Exercise.
     *
     * @return Exercise object
     */
    public Exercise buildExercise() {
      return new Exercise(this);
    }

    /**
     * Sets exercise id field.
     *
     * @param id exercise id
     * @return WorkoutBuilder object
     */
    public ExerciseBuilder exercise_id(int id) {
      this._exercise_id = id;
      return this;
    }

    /**
     * Sets workout id field.
     *
     * @param id workout id
     * @return WorkoutBuilder object
     */
    public ExerciseBuilder workout_id(int id) {
      this._workout_id = id;
      return this;
    }

    /**
     * Sets user id field.
     *
     * @param id user id
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder user_id(int id) {
      this._user_id = id;
      return this;
    }

    /**
     * Sets created at field.
     *
     * @param timestamp time created
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder created_at(Date timestamp) {
      this._created_at = timestamp;
      return this;
    }

    /**
     * Sets description field.
     *
     * @param text description of exercise
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder description(String text) {
      this._description = text;
      return this;
    }

    /**
     * Sets exercise type field.
     *
     * @param type exercise type
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder exercise_type(String type) {
      this._exercise_type = type;
      return this;
    }

    /**
     * Sets target area field.
     *
     * @param target target area
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder target_area(String target) {
      this._target_area = target;
      return this;
    }

    /**
     * Sets duration field.
     *
     * @param length exercise length
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder duration(Double length) {
      this._duration = length;
      return this;
    }

    /**
     * Sets media link field
     *
     * @param link URL to exercise thumbnail
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder media_link(URL link) {
      this._media_link = link;
      return this;
    }

    /**
     * Sets next (exercise ID) field
     *
     * @param id next exercise ID
     * @return ExerciseBuilder object
     */
    public ExerciseBuilder next(int id) {
      this._next = id;
      return this;
    }
  }
}
