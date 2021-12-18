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
    private int gossip_collected;
    

    public Gossip() {
 
    }

    public Gossip(int id, String title, String content, Date date, int user_id, String category, int total, int gossip_collected) {
        this.gossip_id = id;
        this.title = title;
        this.content = content;
        this.date = date;
        this.user_id = user_id;
        this.category = category;
        this.total = total;
        this.gossip_collected = gossip_collected;
    }

    public int getGossip_id() {
        return gossip_id;
    }

    public void setGossip_id(int id){
        this.gossip_id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public int getTotal(){
        return total;
    }

    public int getGossip_collected(){
        return gossip_collected;
    }
    
    public static void add(Gossip discussion) {
    }

}