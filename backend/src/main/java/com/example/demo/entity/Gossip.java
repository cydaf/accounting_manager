package com.example.demo.entity;

import java.sql.Date;

public class Gossip{
    private int id;
    private String title;
    private String user_name;
    private int user_id;
    private String content;
    private Date date;

    public Gossip() {
 
    }

    public Gossip(int id, String title, String content, Date date, String user_name, int user_id) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user_name = user_name;
        this.user_id = user_id;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUser_name() {
        return this.user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public int getUser_id() {
        return this.user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    
    public static void add(Gossip discussion) {
    }

}