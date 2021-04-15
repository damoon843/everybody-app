package edu.brown.cs.everybody.feedComponents;

import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Encapsulates a workout object.
 */
public class Workout {
  private int workout_id;
  private Date created_at;
  private int duration;
  private String media_link;
  private int like_count;
  private String description;
  private String username;
  private String workout_name;

  /**
   * Constructor for Workout
   * @param builder hydrated builder object
   */
  public Workout(WorkoutBuilder builder) {
    this.workout_id = builder._workout_id;
    this.username = builder._username;
    this.workout_name = builder._workout_name;
    this.created_at = builder._created_at;
    this.description = builder._description;
    this.duration = builder._duration;
    this.media_link = builder._media_link;
    this.like_count = builder._like_count;
  }

  /**
   * Getter for workout ID.
   * @return workout ID
   */
  public int getWorkoutId() {
    return this.workout_id;
  }

  /**
   * Getter for name of workout.
   * @return username
   */
  public String workoutName() {
    return this.workout_name;
  }

  /**
   * Getter for username that posted workout.
   * @return username
   */
  public String getUsername() {
    return this.username;
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
   * Getter for workout duration
   * @return duration
   */
  public int getDuration() {
    return this.duration;
  }

  /**
   * Getter for media link.
   * @return media link
   */
  public String getMediaLink() {
    return this.media_link;
  }

  /**
   * Getter for like count.
   * @return like count
   */
  public int getLikeCount() {
    return this.like_count;
  }

  /**
   * Method to convert the Workout into a string to string Map.
   * @return - a map from string to string, where the keys are the field names and the values
   * are the field values as strings.
   */
  public Map<String, String> toMap() throws SQLException {
    Map<String, String> map = new HashMap<>();
    map.put("workout_id", Integer.toString(this.workout_id));
    map.put("posting_user",this.username);
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    String strDate = dateFormat.format(this.created_at);
    map.put("created_at", strDate);
    map.put("description", this.description);
    map.put("duration", Double.toString(this.duration));
    map.put("media_link", this.media_link);
    map.put("like_count", Long.toString(this.like_count));
    map.put("workout_name", this.workout_name);
    return map;
  }

  @Override
  public int hashCode() {
    return Objects.hash(
        workout_id,
        username);
  }

  @Override
  public boolean equals(Object obj) {
    if (obj instanceof Workout) {
      Workout workout = (Workout) obj;
      return workout.getWorkoutId() == this.workout_id;
    } else {
      return false;
    }
  }

  /**
   * Inner builder class for Workouts. Uses the Builder Design pattern.
   */
  public static class WorkoutBuilder {
    private int _workout_id;
    private Date _created_at;
    private int _duration;
    private String _media_link;
    private int _like_count;
    private String _description;
    private String _username;
    private String _workout_name;

    /* Empty constructor */
    public WorkoutBuilder() {}

    /**
     * Final construction of Workout.
     * @return Workout object
     */
    public Workout buildWorkout() {
      return new Workout(this);
    }

    /**
     * Sets workout id field.
     * @param id workout id
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder workout_id(int id) {
      this._workout_id  = id;
      return this;
    }

    /**
     * Sets workout_name field.
     * @param workout_name name of workout
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder workout_name(String workout_name) {
      this._workout_name = workout_name;
      return this;
    }

    /**
     * Sets user id field.
     * @param user username
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder username(String user) {
      this._username  = user;
      return this;
    }

    /**
     * Sets created at field.
     * @param timestamp time created
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder created_at(Date timestamp) {
      this._created_at = timestamp;
      return this;
    }

    /**
     * Sets description field.
     * @param text description of workout
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder description(String text) {
      this._description  = text;
      return this;
    }

    /**
     * Sets duration field.
     * @param length workout length
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder duration(int length) {
      this._duration  = length;
      return this;
    }

    /**
     * Sets media link field
     * @param link URL to workout thumbnail
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder media_link(String link) {
      this._media_link = link;
      return this;
    }

    /**
     * Sets like count field.
     * @param count likes
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder like_count(int count) {
      this._like_count  = count;
      return this;
    }
  }
}
