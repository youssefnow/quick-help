package com.quickhelp.quickhelp_backend.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException(String message) {
        super(message);
    }

    public EmailAlreadyExistsException(String email, String message) {
        super("Email '" + email + "' already exists: " + message);
    }
}