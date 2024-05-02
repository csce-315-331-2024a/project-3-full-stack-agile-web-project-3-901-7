package com.revs.grill;

/**
 * The Role class represents a user role in the system.
 */
public class Role {
    public int _id;
    public String email;
    public String type;

    /**
     * Default constructor for the Role class.
     * Initializes the _id to -1, email to an empty string, and type to "customer".
     */
    public Role() {
        _id = -1;
        email = "";
        type = "customer";
    }

    /**
     * Constructor for the Role class with specified parameters.
     * Initializes the _id, email, and type based on the provided values.
     * If the provided type is not "cashier", "admin", or "manager", the type is set
     * to "customer".
     * 
     * @param _id   the ID of the role
     * @param email the email associated with the role
     * @param type  the type of the role
     */
    public Role(int _id, String email, String type) {
        this._id = -1;
        this.email = email;
        if (!type.equals("cashier") && !type.equals("admin") && !type.equals("manager"))
            this.type = "customer";
        else
            this.type = type;
    }

    /**
     * Constructor for the Role class with specified parameters.
     * Initializes the _id to -1 and delegates to the other constructor.
     * 
     * @param email the email associated with the role
     * @param type  the type of the role
     */
    public Role(String email, String type) {
        this(-1, email, type);
    }

}
