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
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }

    return Record;
    
 }
 public List<Record> findAll(int user_id, String onChangeDate) {
    List<Record> Records = new ArrayList<Record>();
    try {
      Connection conn = dataSource.getConnection();
      String sql =("select id, user_id, price, category, descs, date, revenue from record where date = ? and user_id = ?");
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, onChangeDate);
      stmt.setInt(2, user_id);
      ResultSet rs = stmt.executeQuery();
      while (rs.next()){
        Records.add(getRecord(rs));
      }
      conn.close();
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
      rs.getDate("date"),
      rs.getString("revenue"));
 }

 public int setSum(int user_id,String onChangeDate) {
  int sum = 0;
  try {
    Connection conn = dataSource.getConnection();
    String sql = "select price, date, revenue from record where date = ? and user_id =?";
    PreparedStatement stmt = conn.prepareStatement(sql);
    stmt.setString(1, onChangeDate);
    stmt.setInt(2, user_id);
    ResultSet rs = stmt.executeQuery();
    while (rs.next()){
      if(rs.getString("revenue").equals("expense"))
      {
        sum -= rs.getInt("price");
      }
      if(rs.getString("revenue").equals("income"))
      {
        sum += rs.getInt("price");
      }
    }
    conn.close();
  } catch(Exception e) {
      //something wrong
      System.out.println(e);
  }
  return sum;
}

 public int insert(Record Record) {
    int result = 0;
    try {
      Connection conn = dataSource.getConnection();
      String sql = "insert into record (user_id, price, category, descs, date, revenue) values(?, ?, ?, ?, ?, ?)";
      PreparedStatement stmt = conn.prepareStatement(sql);
      stmt.setString(1, Record.getuser_id());
      stmt.setInt(2, Record.getprice());
      stmt.setString(3, Record.getcategory());
      stmt.setString(4, Record.getdescs());
      stmt.setDate(5, Record.getDate());
      stmt.setString(6, Record.getRevenue());
      System.out.println(stmt);
      result = stmt.executeUpdate();
      conn.close();
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
      System.out.println(stmt);
      result = stmt.executeUpdate();
      conn.close();
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
      conn.close();
    } catch(Exception e) {
      //something wrong
      System.out.println(e);
    }
    return result;
  
   }
 
}