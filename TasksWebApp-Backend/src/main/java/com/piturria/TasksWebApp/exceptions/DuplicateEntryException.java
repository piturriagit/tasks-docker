package com.piturria.TasksWebApp.exceptions;

public class DuplicateEntryException extends RuntimeException {
    public DuplicateEntryException(String message, Throwable cause) {

        super(message, cause);
    }
}