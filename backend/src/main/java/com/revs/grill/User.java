package com.revs.grill;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.ArrayList;

/**
 * The `User` class represents a user in the system and extends the `UserInfo`
 * class.
 * It contains methods to set and get the hash and salt values for the user's
 * password,
 * hash and authenticate the password, write the user object to the database,
 * and convert
 * a list of `User` objects to a list of `UserInfo` objects.
 */
public class User extends UserInfo {
    private String hash;
    private String salt;

    /**
     * Default constructor for the User class.
     * Initializes the hash and salt to empty strings.
     */
    public User() {
        super();
        hash = "";
        salt = "";
    }

    /**
     * Constructor for the User class that takes a UserInfo object as a parameter.
     * Initializes the hash and salt to empty strings.
     * 
     * @param info The UserInfo object to initialize the User object with.
     */
    public User(UserInfo info) {
        this(info._id, info.email, info.name, info.given_name, info.family_name, info.picture);
    }

    /**
     * Constructor for the User class that takes individual parameters.
     * Initializes the hash and salt to empty strings.
     * 
     * @param _id         The user ID.
     * @param email       The user's email.
     * @param name        The user's name.
     * @param given_name  The user's given name.
     * @param family_name The user's family name.
     * @param picture     The user's picture.
     */
    public User(int _id, String email, String name, String given_name, String family_name, String picture) {
        super(_id, email, name, given_name, family_name, picture);
        hash = "";
        salt = "";
    }

    /**
     * Constructor for the User class that takes individual parameters.
     * Initializes the hash and salt to empty strings.
     * 
     * @param email       The user's email.
     * @param name        The user's name.
     * @param given_name  The user's given name.
     * @param family_name The user's family name.
     * @param picture     The user's picture.
     */
    public User(String email, String name, String given_name, String family_name, String picture) {
        super(email, name, given_name, family_name, picture);
        hash = "";
        salt = "";
    }

    /**
     * Sets the hash value for the user's password.
     * 
     * @param hash The hash value for the user's password.
     */
    public void setHash(String hash) {
        this.hash = hash;
    }

    /**
     * Sets the salt value for the user's password.
     * 
     * @param salt The salt value for the user's password.
     */
    public void setSalt(String salt) {
        this.salt = salt;
    }

    /**
     * Gets the hash value for the user's password.
     * 
     * @return The hash value for the user's password.
     */
    public String getHash() {
        return hash;
    }

    /**
     * Gets the salt value for the user's password.
     * 
     * @return The salt value for the user's password.
     */
    public String getSalt() {
        return salt;
    }

    /**
     * Hashes the given password using SHA-256 algorithm and sets the hash and salt
     * values.
     * 
     * @param password The password to be hashed.
     */
    public void hashPassword(String password) {
        SecureRandom random = new SecureRandom();
        byte[] saltBytes = new byte[16];
        random.nextBytes(saltBytes);
        salt = Base64.getEncoder().encodeToString(saltBytes);

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(saltBytes);
            byte[] hashedPassword = md.digest(password.getBytes());
            hash = Base64.getEncoder().encodeToString(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    /**
     * Authenticates the given password by comparing the hash value with the input
     * password.
     * 
     * @param password The password to be authenticated.
     * @return true if the password is authenticated, false otherwise.
     */
    public boolean authenticate(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(Base64.getDecoder().decode(salt));
            byte[] hashedPassword = md.digest(password.getBytes());
            String inputHash = Base64.getEncoder().encodeToString(hashedPassword);
            return inputHash.equals(hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * Writes the user object to the database with the given password.
     * 
     * @param password The password to be written to the database.
     * @return The result of the database insert operation.
     */
    public int write(String password) {
        return Database.insertUser(this, password);
    }

    /**
     * Converts a list of User objects to a list of UserInfo objects.
     * 
     * @param users The list of User objects to be converted.
     * @return The list of UserInfo objects.
     */
    public static List<UserInfo> toInfoList(List<User> users) {
        List<UserInfo> userInfos = new ArrayList<>();
        for (User user : users)
            userInfos.add((UserInfo) user);
        return userInfos;
    }
}