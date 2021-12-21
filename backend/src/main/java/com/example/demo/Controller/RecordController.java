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

  @GetMapping(value = "/RecordSum/{id}/date/{date}")
  public int retrieveRecordSum(@PathVariable("id") int id, @PathVariable("date") String date) throws SQLException {
    return dao.setSum(id, date);
  }

  @GetMapping(value = "/Record/{id}/date/{date}")
  public List<Record> retrieveRecords(@PathVariable("id") int id,@PathVariable("date") String date) throws SQLException{
    return dao.findAll(id, date);
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