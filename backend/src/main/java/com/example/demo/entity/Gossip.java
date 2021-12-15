package com.example.demo.entity;

import java.sql.Date;

public class Gossip{
    private int gossip_id;
    private String title;
    private String content;
    private Date date;
    private int user_id;
    private String category;
    private int total;
    

    public Gossip() {
 
    }

    public Gossip(int gossip_id, String title, String content, Date date, int user_id,String category, int total) {
        this.gossip_id = gossip_id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user_id = user_id;
        this.category = category;
        this.total = total;
    }

    public int getgossip_Id() {
        return this.gossip_id;
    }

    public void setgossip_Id(int gossip_id) {
        this.gossip_id = gossip_id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getCategory(){
        return this.category;
    }

    public int getTotal(){
        return this.total;
    }

    public void setCategory(String category){
        this.category = category;
    }
    
    public static void add(Gossip discussion) {
    }

}