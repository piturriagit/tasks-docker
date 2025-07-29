package com.piturria.TasksWebApp.model;

import java.util.Date;

public class BearerToken {
    private String username;
    private String jwt;
    private Date expiration;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    @Override
    public String toString() {
        return "BearerToken {" +
                "username='" + username + '\'' +
                ", expiration=" + expiration +
                ", jwt='" + jwt + '\'' +
                '}';
    }
}
