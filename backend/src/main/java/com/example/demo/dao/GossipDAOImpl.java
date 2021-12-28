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
public class GossipDAOImpl implements GossipDAO{

  @Autowired
  private DataSource dataSource;

//jdbc

 // 列出使用者所有典藏
 public List<Gossip> showArchieve(int user_id) {
  List<Gossip> discussion = new ArrayList<Gossip>();
  try {
    Connection conn = dataSource.getConnection();
    String sql = "select g.*, u.name as author, count(totallike.gossip_id) as total, c.iscollect, personlike.islike "+ 
    "from accounting.gossip g "+
    "left join accounting.likelist totallike on totallike.islike = 1 and totallike.gossip_id = g.gossip_id "+
    "left join accounting.likelist personlike on personlike.islike = 1 and personlike.user_id = ? and personlike.gossip_id = g.gossip_id "+
    "inner join accounting.collect c on c.user_id = ? and c.iscollect = 1 and c.gossip_id = g.gossip_id "+
    "inner join accounting.user u on u.user_id = g.user_id "+
    "group by g.gossip_id "+
    "order by g.user_id desc";
    PreparedStatement stmt = conn.prepareStatement(sql);
    stmt.setInt(1, user_id);
    stmt.setInt(2, user_id);
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

 // 列出使用者自己發表的文章
 public List<Gossip> showPersonal(int user_id) {
  List<Gossip> discussion = new ArrayList<Gossip>();
  try {
    Connection conn = dataSource.getConnection();
    String sql = "select g.*, u.name as author, count(totallike.gossip_id) as total, c.iscollect, personlike.islike "+
    "from accounting.gossip g "+
    "left join accounting.likelist totallike on totallike.islike = 1 and totallike.gossip_id = g.gossip_id "+ 
    "left join accounting.likelist personlike on personlike.islike = 1 and personlike.user_id = ? and personlike.gossip_id = g.gossip_id "+
    "left join accounting.collect c on c.iscollect = 1 and c.user_id = ? and c.gossip_id = g.gossip_id "+
    "inner join accounting.user u on u.user_id = g.user_id and u.user_id = ? "+
    "group by g.gossip_id "+
    "order by g.user_id desc";
    PreparedStatement stmt = conn.prepareStatement(sql);
    stmt.setInt(1, user_id);
    stmt.setInt(2, user_id);
    stmt.setInt(3, user_id);
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

//列出討論板所有的文章
public List<Gossip> findAll(int user_id) {
  List<Gossip> discussion = new ArrayList<Gossip>();
  try {
    Connection conn = dataSource.getConnection();
    String sql = "select g.*, u.name as author, count(totallike.gossip_id) as total, c.iscollect, personlike.islike "+
    "from accounting.gossip g "+
    "left join accounting.likelist totallike on totallike.islike = 1 and totallike.gossip_id = g.gossip_id "+
    "left join accounting.likelist personlike on personlike.islike = 1 and personlike.user_id = ? and personlike.gossip_id = g.gossip_id "+
    "left join accounting.collect c on c.iscollect = 1 and c.user_id = ? and c.gossip_id = g.gossip_id "+
    "inner join accounting.user u on u.user_id = g.user_id "+
    "group by g.gossip_id "+
    "order by g.user_id desc";
    PreparedStatement stmt = conn.prepareStatement(sql);
    stmt.setInt(1, user_id);
    stmt.setInt(2, user_id);
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
    rs.getString("author"),
    rs.getInt("total"),
    rs.getInt("iscollect"),
    rs.getInt("islike"));

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
  
  //更新文章內容
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

  //更新收藏
  public int updateCollect(Gossip discussion) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "Insert into collect (gossip_id, user_id, iscollect) values (?, ?, ?) on duplicate key update iscollect = ?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, discussion.getGossip_id());
      stmt.setInt(2, discussion.getUser_id());
      stmt.setInt(3, discussion.getIscollect());
      stmt.setInt(4, discussion.getIscollect());
      System.out.print(stmt);
      result = stmt.executeUpdate();
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  }

  //更新喜歡的文章
  public int updateLike(Gossip discussion) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "Insert into likelist (gossip_id, user_id, islike) values (?, ?, ?) on duplicate key update islike = ?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, discussion.getGossip_id());
      stmt.setInt(2, discussion.getUser_id());
      stmt.setInt(3, discussion.getIslike());
      stmt.setInt(4, discussion.getIslike());
      System.out.print(stmt);
      result = stmt.executeUpdate();
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  }

  //刪除文章
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