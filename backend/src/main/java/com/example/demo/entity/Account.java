package com.example.demo.entity;

public class Account {
    private int user_id;
    private String account;
    private String username;
    private String password;

    public Account(int user_id, String account, String username, String password) {
        this.user_id = user_id;
        this.account = account;
        this.username = username;
        this.password = password;
    }

    public int getUser_id(){
        return this.user_id;
    }

    public void setUser_id(int user_id){
        this.user_id = user_id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccount() {
        return this.account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

}