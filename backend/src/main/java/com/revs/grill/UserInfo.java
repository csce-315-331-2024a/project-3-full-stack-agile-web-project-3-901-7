package com.revs.grill;

/**
 * Represents user information.
 */
public class UserInfo {
    public int _id;
    public String email;
    public String name;
    public String given_name;
    public String family_name;
    public String picture;

    /**
     * Default constructor for UserInfo.
     * Initializes all fields to empty values.
     */
    public UserInfo() {
        this._id = -1;
        this.email = "";
        this.name = "";
        this.given_name = "";
        this.family_name = "";
        this.picture = "";
    }

    /**
     * Constructor for UserInfo with all fields.
     * 
     * @param _id         The user ID.
     * @param email       The user's email.
     * @param name        The user's name.
     * @param given_name  The user's given name.
     * @param family_name The user's family name.
     * @param picture     The user's picture.
     */
    public UserInfo(int _id, String email, String name, String given_name, String family_name, String picture) {
        this._id = _id;
        this.email = email;
        this.name = name;
        this.given_name = given_name;
        this.family_name = family_name;
        this.picture = picture;
    }

    /**
     * Constructor for UserInfo without the user ID.
     * Sets the user ID to -1.
     * 
     * @param email       The user's email.
     * @param name        The user's name.
     * @param given_name  The user's given name.
     * @param family_name The user's family name.
     * @param picture     The user's picture.
     */
    public UserInfo(String email, String name, String given_name, String family_name, String picture) {
        this(-1, email, name, given_name, family_name, picture);
    }

    /**
     * Returns a string representation of the UserInfo object.
     * 
     * @return The string representation of the UserInfo object.
     */
    @Override
    public String toString() {
        return email + "," + name;
    }
}
