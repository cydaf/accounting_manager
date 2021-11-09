package com.example.demo.Controller;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.dao.RecordDAO;
import com.example.demo.entity.Record;

@RestController
public class RecordController {  
  @Autowired
  RecordDAO dao;

  @GetMapping(value = "/Record")
  public List<Record> retrieveRecords() throws SQLException{
      return dao.findAll();
  }
  @GetMapping(value = {"/Record/{id}"})
  public Record retrieveOneRecord(@PathVariable("id") int id) throws SQLException{
      return dao.findOne(id);
  }
  @PostMapping(value = "/Record")
  public void processFormCreate(@RequestBody Record Record) throws SQLException {
      dao.insert(Record);
  }
  
  @PutMapping(value = "/Record")
  public void processFormUpdate(@RequestBody Record Record) throws SQLException {
      dao.update(Record);
  }
  
  @DeleteMapping(value = "/Record/{id}")
  public void deleteRecord(@PathVariable("id") int id) {
      dao.delete(id);
  }
}