package com.korepetytio.Korepetytio.entities.enums;

public enum StarReview {
    ONE("1"),
    TWO("2"),
    THREE("3"),
    FOUR("4"),
    FIVE("5");
    private final String star;
    StarReview(String star) {
        this.star = star;
    }
    public String getStar() {
        return star;
    }

}
