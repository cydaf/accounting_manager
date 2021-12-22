package com.example.demo.entity;

import java.sql.Date;

public class Gossip{
    private int gossip_id;
    private String title;
    private String content;
    private Date date;
    private int user_id;
    private String category;
    private String author;
    private int total;
    private int islike;
    private int iscollect;

    public int getIscollect() {
        return this.iscollect;
    }

    public void setIscollect(int iscollect) {
        this.iscollect = iscollect;
    }

    public int getGossip_id() {
        return this.gossip_id;
    }

    public void setGossip_id(int gossip_id) {
        this.gossip_id = gossip_id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public int getUser_id() {
        return this.user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCategory() {
        return this.category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getTotal() {
        return this.total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getIslike() {
        return this.islike;
    }

    public void setIslike(int islike) {
        this.islike = islike;
    }

    
    

    public Gossip() {
 
    }

    public Gossip(int id, String title, String content, Date date, int user_id, String category, String author, int total, int islike, int iscollect) {
        this.gossip_id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user_id = user_id;
        this.category = category;
        this.author = author;
        this.total = total;
        this.islike = islike;
        this.iscollect = iscollect;
    }

    
    
    public static void add(Gossip discussion) {
    }

}