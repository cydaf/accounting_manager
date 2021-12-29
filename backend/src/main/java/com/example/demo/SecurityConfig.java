package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception { 
        //http
        http.httpBasic().and()
        //.cors().and()
        .csrf().disable().authorizeRequests()
        .antMatchers("/").permitAll()
        .antMatchers(HttpMethod.POST,"/user").permitAll()
        .anyRequest().authenticated()
        .and()
        .formLogin();
    }

    @Autowired
    private DataSource dataSource;
     
    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        System.out.println(auth);
        PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        auth.jdbcAuthentication()
            .passwordEncoder(passwordEncoder)
            .dataSource(dataSource)
            .usersByUsernameQuery("select account, password, enabled from user where account=?")
            .authoritiesByUsernameQuery("select account, role from user where account=?");
    }
    
}