package com.example.demo.dao;

import com.example.demo.entity.Account;

public interface AccountDAO {
    public int signUp(Account account);
    public String showName(int user_id);
}