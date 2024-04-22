package com.revs.grill;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.ArrayList;

public class User extends UserInfo {
    private String hash;
    private String salt;

    public User() {
        super();
        hash = "";
        salt = "";
    }

    public User(UserInfo info) {
        this(info._id, info.email, info.name, info.given_name, info.family_name, info.picture);
    }
    
    public User(int _id, String email, String name, String given_name, String family_name, String picture) {
        super(_id, email, name, given_name, family_name, picture);
        hash = "";
        salt = "";
    }
    
    public User(String email, String name, String given_name, String family_name, String picture) {
        super(email, name, given_name, family_name, picture);
        hash = "";
        salt = "";
    }

    public void setHash(String hash) { this.hash = hash; }
    public void setSalt(String salt) { this.salt = salt; }
    public String getHash() { return hash; }
    public String getSalt() { return salt; }

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

    public int write(String password) {
        return Database.insertUser(this, password);
    }

    public static List<UserInfo> toInfoList(List<User> users) {
        List<UserInfo> userInfos = new ArrayList<>();
        for (User user : users)
            userInfos.add((UserInfo) user);
        return userInfos;
    } 
}