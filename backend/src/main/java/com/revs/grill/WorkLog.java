package com.revs.grill;

import java.sql.Timestamp;
import java.util.*;

/**
 * The WorkLog class represents a work log entry for an employee.
 */
public class WorkLog {
    public int log_id;
    public int emp_id;
    public java.sql.Timestamp checkin;
    public java.sql.Timestamp checkout;
    public String comments;

    /**
     * Default constructor for the WorkLog class.
     * Initializes all fields to their default values.
     */
    public WorkLog() {
        this.log_id = -1;
        this.emp_id = -1;
        this.checkin = null;
        this.checkout = null;
        this.comments = null;
    }

    /**
     * Parameterized constructor for the WorkLog class.
     * Initializes the fields with the provided values.
     *
     * @param log_id   The ID of the work log entry.
     * @param emp_id   The ID of the employee associated with the work log entry.
     * @param checkin  The timestamp when the employee checked in.
     * @param checkout The timestamp when the employee checked out.
     * @param comments Additional comments for the work log entry.
     */
    public WorkLog(int log_id, int emp_id, java.sql.Timestamp checkin, java.sql.Timestamp checkout, String comments) {
        this.log_id = log_id;
        this.emp_id = emp_id;
        this.checkin = checkin;
        this.checkout = checkout;
        this.comments = comments;
    }

    /**
     * Writes the work log entry to the database.
     */
    public void write() {
        Database.insertWorkLog(this);
    }

    /**
     * Retrieves a list of WorkLog objects corresponding to the provided lists of
     * IDs.
     *
     * @param ids The list of IDs for which WorkLog objects are to be retrieved.
     * @return A list of WorkLog objects corresponding to the provided IDs.
     */
    public static List<WorkLog> findById(List<Integer> ids) {
        return Database.getLogById(ids);
    }
}