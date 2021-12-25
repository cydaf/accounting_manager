package com.example.demo.entity;

import java.sql.Date;

public class Record{
    private int id;
    private String user_id;
    private int price;
    private String category;
    private String descs;
    private Date date;
    private String revenue;
    public Record() {
 
    }
    public Record(int id, String user_id, String descs, int price, String category, Date date, String revenue) {
      this.id = id;
      this.user_id = user_id;
      this.price = price;
      this.category = category;
      this.descs = descs;
      this.date = date;
      this.revenue = revenue;
    }
    
    public int getId() {
      return id;
     }
     public void setId(int id) {
      this.id = id;
     }

    public String getuser_id() {
      return user_id;
    }

    public void setuser_id(String user_id) {
      this.user_id = user_id;//this 去呼叫外層的 String name
    }

    public String getdescs() {
      return descs;
    }

    public void setdescs(String descs) {
      this.descs = descs;//this 去呼叫外層的 String name
    }

    public int getprice() {
        return price;
      }
  
    public void setprice(int price) {
    this.price = price;//this 去呼叫外層的 String name
    }

    public String getcategory() {
      return category;
    }

    public void setcategory(String category) {
      this.category = category;
    }

    public Date getDate() {
      return date;
    }

    public void setDate(Date date) {
      this.date = date;
    }

    public String getRevenue() {
      return revenue;
    }

    public void setRevenue(String revenue) {
      this.revenue = revenue;
    }

    public static void add(Record product) {
    }
}