package com.revs.grill;

public class UserInfo {
    public int _id;
    public String email;
    public String name;
    public String given_name;
    public String family_name;
    public String picture;

    public UserInfo() {
        this._id = -1;
        this.email = "";
        this.name = "";
        this.given_name = "";
        this.family_name = "";
        this.picture = "";
    }

    public UserInfo(int _id, String email, String name, String given_name, String family_name, String picture) {
        this._id = _id;
        this.email = email;
        this.name = name;
        this.given_name = given_name;
        this.family_name = family_name;
        this.picture = picture;
    }

    public UserInfo(String email, String name, String given_name, String family_name, String picture) {
        this(-1, email, name, given_name, family_name, picture);
    }
}
