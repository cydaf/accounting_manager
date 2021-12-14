package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Record;

public interface RecordDAO {

public List<Record> findAll();

public Record findOne(int id);

public int setSum();

public int insert(Record record);

public int update(Record record);

public int delete(int id);

}