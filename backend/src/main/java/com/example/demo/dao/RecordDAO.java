package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Record;

public interface RecordDAO {

public List<Record> findAll(int user_id, String onChangeDate);

public Record findOne(int id);

public int setSum(int user_id, String onChangeDate);

public int insert(Record record);

public int update(Record record);

public int delete(int id);

}