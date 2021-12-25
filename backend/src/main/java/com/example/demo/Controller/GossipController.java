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

import com.example.demo.dao.GossipDAO;
import com.example.demo.entity.Gossip;

@RestController
public class GossipController {  
  
    @Autowired
    GossipDAO dao;

    @GetMapping(value = "/Gossip/{user_id}") // 列出全部
    public List<Gossip> retrieveRecords(@PathVariable("user_id") int user_id) throws SQLException{
        return dao.findAll(user_id);
    }

    @GetMapping(value = "/Gossip/archieve/{user_id}") // 列出典藏
    public List<Gossip> retrievearchive(@PathVariable("user_id") int user_id) throws SQLException{
        return dao.showArchieve(user_id);
    }

    @GetMapping(value = "/Gossip/personal/{user_id}") // 列出已發表
    public List<Gossip> retrievePersonal(@PathVariable("user_id") int user_id) throws SQLException{
        return dao.showPersonal(user_id);
    }

    @PostMapping(value = "/Gossip") // 新增
    public void processFormCreate(@RequestBody Gossip Gossip) throws SQLException {
        dao.insert(Gossip);
    }

    @PutMapping(value = "/Gossip") // 修改文章
    public void processFormUpdate(@RequestBody Gossip Gossip) throws SQLException {
        dao.update(Gossip);
    }

    @PutMapping(value = "/Gossip/like") // 修改喜歡
    public void processlikeUpdate(@RequestBody Gossip Gossip) throws SQLException {
        dao.updateLike(Gossip);
    }

    @PutMapping(value = "/Gossip/collect") // 修改收藏
    public void processcollectUpdate(@RequestBody Gossip Gossip) throws SQLException {
        dao.updateCollect(Gossip);
    }

    @DeleteMapping(value = "/Gossip/{id}") // 刪除
    public void deleteGossip(@PathVariable("id") int id) {
        dao.delete(id);
    }
}