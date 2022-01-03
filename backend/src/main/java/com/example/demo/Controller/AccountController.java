package com.example.demo.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dao.AccountDAO;
import com.example.demo.entity.Account;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

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
    //get username
    @GetMapping(value = {"/username"})
    @ResponseBody
    public String currentUserName(Authentication authentication) {
        return dao.showName(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    //getuserID
    @GetMapping(value = {"/userID"})
    @ResponseBody
    public String currentUser(Authentication authentication) {
        return dao.showID(SecurityContextHolder.getContext().getAuthentication().getName());
    }

}