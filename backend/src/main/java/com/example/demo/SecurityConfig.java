package com.example.demo;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception { 
        http
        .httpBasic().and()
        // .cors().and()
        .csrf().disable().authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers(HttpMethod.POST, "/Record").permitAll()
        .antMatchers(HttpMethod.PUT, "/Record").permitAll()
        .antMatchers(HttpMethod.DELETE, "/Record").permitAll()
        .antMatchers(HttpMethod.GET, "/Gossip").permitAll()
        .antMatchers(HttpMethod.POST, "/Gossip").permitAll()
        .antMatchers(HttpMethod.PUT, "/Gossip").permitAll()
        .antMatchers(HttpMethod.DELETE, "/Gossip").permitAll()
        //.anyRequest().authenticated()
        .and()
        .formLogin();
    }
}