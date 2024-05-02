package com.revs.grill;

/**
 *
 */
public class Role {
    public int _id;
    public String email;
    public String type;

    /**
     *
     */
    public Role() {
        _id = -1;
        email = "";
        type = "customer";
    }

    /**
     * @param _id
     * @param email
     * @param type
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
     * @param email
     * @param type
     */
    public Role(String email, String type) {
        this(-1, email, type);
    }
    
}
