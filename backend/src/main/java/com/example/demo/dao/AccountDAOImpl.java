package com.example.demo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.sql.DataSource;
import com.example.demo.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Repository

public class AccountDAOImpl implements AccountDAO {
    @Autowired
    private DataSource dataSource;

    public int signUp(Account account){
        int result = 0;
        try {
          Connection conn = dataSource.getConnection();
          String sql_check = "select account from user where account = ? ";
          PreparedStatement stmt_check = conn.prepareStatement(sql_check);
          stmt_check.setString(1,account.getAccount());
          ResultSet result_check = stmt_check.executeQuery();
          if(!result_check.next())
          {
            String sql = "insert into user (name, account, password, enabled) values(?, ?, ?, 1)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, account.getUsername());
            stmt.setString(2, account.getAccount());
            String encoded = "{bcrypt}"+new BCryptPasswordEncoder().encode(account.getPassword());
            stmt.setString(3, encoded);
            result = stmt.executeUpdate();
            conn.close();
          }
        } catch(Exception e) {
          //something wrong
          System.out.println(e);
        }
        return result;
    }

    public String showName(String account) {
    String name = null;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select name from user where account = ? ";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, account);
      ResultSet rs = stmt.executeQuery();
      while(rs.next() != false){
        name = rs.getString("name");
      }
      conn.close();
    } catch(Exception e) {
        //something wrong
        System.out.println(e);
    }
    return name;
  }
    
}