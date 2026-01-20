package com.vault.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AspectRatio {
    SQUARE,
    PORTRAIT,
    LANDSCAPE;

    @JsonCreator
    public static AspectRatio fromString(String value) {
        if (value == null) {
            return null;
        }
        return AspectRatio.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name().toLowerCase();
    }
}
