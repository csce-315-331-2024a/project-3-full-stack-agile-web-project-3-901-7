package com.revs.grill;
import java.sql.Timestamp;
import java.util.*;

/**
 *
 */
public class WorkLog {
    public int log_id;
    public int emp_id;
    public java.sql.Timestamp checkin;
    public java.sql.Timestamp checkout;
    public String comments;

    /**
     *
     */
    public WorkLog()
    {
        this.log_id = -1;
        this.emp_id = -1;
        this.checkin = null;
        this.checkout = null;
        this.comments = null;
    }

    /**
     * @param log_id
     * @param emp_id
     * @param checkin
     * @param checkout
     * @param comments
     */
    public WorkLog(int log_id, int emp_id, java.sql.Timestamp checkin, java.sql.Timestamp checkout, String comments)
    {
        this.log_id = log_id;
        this.emp_id = emp_id;
        this.checkin = checkin;
        this.checkout = checkout;
        this.comments = comments;
    }

    /**
     *
     */
    public void write() {
        Database.insertWorkLog(this);
    }

    /**
     * Retrieves a list of WorkLog objects corresponding to the provided lists of IDs
     *
     * @param ids The list of IDs for which WorkLog objects are to be retrieved
     * @return A list of WorkLog objects corresponding to the provided IDs
     */
    public static List<WorkLog> findById(List<Integer> ids) {
        return Database.getLogById(ids);
    }
}