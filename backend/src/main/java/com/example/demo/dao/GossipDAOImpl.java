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
public Gossip findOne(int gossip_id) {
    Gossip Gossip = new Gossip();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select c.gossip_id as gossip_collected, u.name as author,g.*, count(l.user_id) as total from accounting.gossip g "+
      "left join accounting.likelist l on l.islike = 1 and l.gossip_id = g.gossip_id "+
      "left join accounting.user u on g.user_id = u.user_id "+ 
      "left join accounting.collect c on c.user_id = 1 and c.gossip_id = g.gossip_id "+
      "where g.gossip_id = l.gossip_id and u.user_id = g.user_id and l.gossip_id = ?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, gossip_id);
      System.out.print(stmt);
      ResultSet rs = stmt.executeQuery();
      
      if (rs.next()) {
        Gossip = getGossip(rs);
      }
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }

    return Gossip;
    
 }
 
 public List<Gossip> findAll(int user_id) {
    List<Gossip> discussion = new ArrayList<Gossip>();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select c.gossip_id as gossip_collected, u.name as author,g.*, count(l.user_id) as total from accounting.gossip g "+
      "left join accounting.likelist l on l.islike = 1 and l.gossip_id = g.gossip_id "+
      "left join accounting.user u on g.user_id = u.user_id "+ 
      "left join accounting.collect c on c.user_id = ? and c.gossip_id = g.gossip_id "+
      "group by g.gossip_id";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, user_id);
      ResultSet rs = stmt.executeQuery();
      while (rs.next()){
        discussion.add(getGossip(rs));
      }
      conn.close();
    } catch(Exception e) {
        //something wrong
        System.out.println(e);
    }
       return discussion;
   }
  
 public Gossip getGossip(ResultSet rs) throws SQLException{
    
    return new Gossip(
      rs.getInt("gossip_id"),
      rs.getString("title"),
      rs.getString("content"),
      rs.getDate("date"),
      rs.getInt("user_id"),
      rs.getString("category"),
      rs.getInt("total"),
      rs.getInt("gossip_collected"));

 }
 public int insert(Gossip discussion) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "insert into gossip (title, content, date, user_id, category) values(?, ?, ?, ?, ?)";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, discussion.getTitle());
      stmt.setString(2, discussion.getContent());
      stmt.setDate(3, discussion.getDate());
      stmt.setInt(4, discussion.getUser_id());
      stmt.setString(5, discussion.getCategory());
      System.out.println(stmt);
      result = stmt.executeUpdate();
      conn.close();
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
      String sql = "update gossip set title =?, content =?, date =?, category =? where gossip_id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, discussion.getTitle());
      stmt.setString(2, discussion.getContent());
      stmt.setDate(3, discussion.getDate());
      stmt.setString(4,discussion.getCategory());
      stmt.setInt(5, discussion.getGossip_id());
      System.out.print(stmt);
      result = stmt.executeUpdate();
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
  
  }
  
  public int delete(int gossip_id) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "delete from gossip where gossip_id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, gossip_id);
      result = stmt.executeUpdate();
      conn.close(); // 關閉連結
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
   }
 
}