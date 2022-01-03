package com.example.demo.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.SQLException;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dao.AccountDAO;
import com.example.demo.entity.Account;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class AccountController {
    @Autowired
    AccountDAO dao;

    //sigh up
    @PostMapping(value = {"/user"})
    public String signUp(@RequestBody Account account) {
        int result = dao.signUp(account);
        return (result == 1)? "帳號已註冊成功": "帳號未註冊成功";
    }

    //login
    @GetMapping(value = {"/user"})
    public String login() {
        return "登入成功";
    }

    @GetMapping(value = {"/user/{user_id}"})
    public String showname(@PathVariable("user_id") int user_id) throws SQLException{
        return dao.showName(user_id);
    }

}