package com.example.demo.dao;

import java.util.List;
import com.example.demo.entity.Gossip;

public interface GossipDAO {

 public List<Gossip> findAll();

public Gossip findOne(int id);

public int insert(Gossip gossip);

public int update(Gossip gossip);

public int delete(int id);

}