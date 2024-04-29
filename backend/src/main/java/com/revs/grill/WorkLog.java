package com.revs.grill;
import java.sql.Timestamp;
import java.util.*;

public class WorkLog {
    public int log_id;
    public int emp_id;
    public java.sql.Timestamp checkin;
    public java.sql.Timestamp checkout;
    public String comments;

    public WorkLog()
    {
        this.log_id = -1;
        this.emp_id = -1;
        this.checkin = null;
        this.checkout = null;
        this.comments = null;
    }

    public WorkLog(int log_id, int emp_id, java.sql.Timestamp checkin, java.sql.Timestamp checkout, String comments)
    {
        this.log_id = log_id;
        this.emp_id = emp_id;
        this.checkin = checkin;
        this.checkout = checkout;
        this.comments = comments;
    }

    public void write() {
        Database.insertWorkLog(this);
    }

    public static List<WorkLog> findById(List<Integer> ids) {
        return Database.getLogById(ids);
    }
}