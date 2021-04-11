package edu.brown.cs.everybody.feedComponents;



import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Encapsulates a workout object.
 */
public class Workout {
 // private int workout_id;
  private String name;
  private int user_id;
  private Date created_at;
  private String description;
  private Double duration;
  private URL media_link;
  private Long like_count;
  private String type;

  /**
   * Constructor for Workout
   * @param builder hydrated builder object
   */
  public Workout(WorkoutBuilder builder) {
    // TODO: remove workout_id
    // this.workout_id = builder._workout_id;
    this.name = builder._name;
    this.user_id = builder._user_id;
    this.created_at = builder._created_at;
    this.description = builder._description;
    this.duration = builder._duration;
    this.media_link = builder._media_link;
    this.like_count = builder._like_count;
    this.type = builder._type;
  }

//  /**
//   * Getter for workout ID.
//   * @return workout ID
//   */
//  public int getWorkoutId() {
//    return this.workout_id;
//  }

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
   * Getter for workout type.
   * @return workout type
   */
  public String getType() {
    return this.type;
  }

   * Method to convert the Workout into a string to string Map.
   * @return - a map from string to string, where the keys are the field names and the values
   * are the field values as strings.
   */
  public Map<String, String> toMap() {
    Map<String, String> map = new HashMap<>();
    map.put("workout_id", Integer.toString(this.workout_id));
    // TODO: FINISH
    map.put("duration", Double.toString(this.duration));
    return map;
  }

  /**
   * Inner builder class for Workouts. Uses the Builder Design pattern.
   */
  public static class WorkoutBuilder {
    private String _name;
    private int _workout_id;
    private int _user_id;
    private Date _created_at;
    private String _description;
    private Double _duration;
    private URL _media_link;
    private Long _like_count;
    private String _type;

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
    public WorkoutBuilder name(String workout_name) {
      this._name = workout_name;
      return this;
    }

    /**
     * Sets user id field.
     * @param id user id
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder user_id(int id) {
      this._user_id  = id;
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
    public WorkoutBuilder duration(Double length) {
      this._duration  = length;
      return this;
    }

    /**
     * Sets media link field
     * @param link URL to workout thumbnail
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder media_link(URL link) {
      this._media_link = link;
      return this;
    }

    /**
     * Sets like count field.
     * @param count likes
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder like_count(Long count) {
      this._like_count  = count;
      return this;
    }

    /**
     * Sets workout type field.
     * @param workout_type type of workout
     * @return WorkoutBuilder object
     */
    public WorkoutBuilder type(String workout_type) {
      this._type = workout_type;
      return this;
    }
  }
}
