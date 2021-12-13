package com.example.demo.dao;

import java.util.ArrayList;
import java.util.List;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Gossip;

@Repository
public class GossipDAOImpl implements GossipDAO {

  @Autowired
  private DataSource dataSource;

//jdbc
public Gossip findOne(int id) {
    Gossip Gossip = new Gossip();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select id, title, content, date, user_id, user_name from gossip where id = ?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, id);
      ResultSet rs = stmt.executeQuery();
      
      if (rs.next()) {
        Gossip = getGossip(rs);
      }

    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }

    return Gossip;
    
 }
 public List<Gossip> findAll() {
    List<Gossip> discussion = new ArrayList<Gossip>();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select id, title, content, date, user_id, user_name from gossip";
      PreparedStatement stmt = conn.prepareStatement(sql);
      
      ResultSet rs = stmt.executeQuery();
      while (rs.next()){
        discussion.add(getGossip(rs));
      }
  
    } catch(Exception e) {
        //something wrong
        System.out.println(e);
    }
       return discussion;
   }
 public Gossip getGossip(ResultSet rs) throws SQLException{
    
    return new Gossip(
      rs.getInt("id"),
      rs.getString("title"),
      rs.getString("content"),
      rs.getDate("date"),
      rs.getString("user_name"),
      rs.getInt("user_id"));

 }
 public int insert(Gossip discussion) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "insert into gossip (id, title, content, date, user_id, user_name) values(?, ?, ?, ?, ?, ?)";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, discussion.getId());
      stmt.setString(2, discussion.getTitle());
      stmt.setString(3, discussion.getContent());
      stmt.setDate(4, discussion.getDate());
      stmt.setInt(5, discussion.getUser_id());
      stmt.setString(6, discussion.getUser_name());
      result = stmt.executeUpdate();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
  }
  public int update(Gossip discussion) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "update gossip set title=?, content=?, date=? where id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, discussion.getTitle());
      stmt.setString(2, discussion.getContent());
      stmt.setDate(3, discussion.getDate());
      stmt.setInt(4, discussion.getId());
      result = stmt.executeUpdate();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
  
  }
  
  public int delete(int id) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "delete from gossip where id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, id);
      result = stmt.executeUpdate();
      conn.close(); // 關閉連結
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
   }
 
}