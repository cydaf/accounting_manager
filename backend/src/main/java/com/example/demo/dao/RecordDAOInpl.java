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

import com.example.demo.entity.Record;

@Repository
public class RecordDAOInpl implements RecordDAO {

  @Autowired
  private DataSource dataSource;

//jdbc
public Record findOne(int id) {
    Record Record = new Record();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select id, user_id, price, category, descs, date from Record where id = ?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, id);
      ResultSet rs = stmt.executeQuery();
      
      if (rs.next()) {
        Record = getRecord(rs);
      }

    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }

    return Record;
    
 }
 public List<Record> findAll() {
    List<Record> Records = new ArrayList<Record>();
    try {
      Connection conn = dataSource.getConnection();
      String sql = "select id, user_id, price, category, descs, date from record";
      PreparedStatement stmt = conn.prepareStatement(sql);
      
      ResultSet rs = stmt.executeQuery();
      while (rs.next()){
        Records.add(getRecord(rs));
      }
  
    } catch(Exception e) {
        //something wrong
        System.out.println(e);
    }
       return Records;
   }
 public Record getRecord(ResultSet rs) throws SQLException{
    
    return new Record(
      rs.getInt("id"),
      rs.getString("user_id"),
      rs.getString("descs"),
      rs.getInt("price"),
      rs.getString("category"),
      rs.getDate("date"));

 }
 public int insert(Record Record) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "insert into record (user_id, price, category, descs, date) values(?, ?, ?, ?, ?)";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, Record.getId());
      stmt.setInt(2, Record.getprice());
      stmt.setString(3, Record.getcategory());
      stmt.setString(4, Record.getdescs());
      stmt.setDate(5, Record.getDate());
      result = stmt.executeUpdate();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
  }
  public int update(Record Record) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "update record set descs=?, price=?, category=?,date=? where id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, Record.getdescs());
      stmt.setInt(2, Record.getprice());
      stmt.setString(3, Record.getcategory());
      stmt.setDate(4, Record.getDate());
      stmt.setInt(5, Record.getId());
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
      String sql = "delete from record where id =?";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setInt(1, id);
      result = stmt.executeUpdate();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
   }
 
}