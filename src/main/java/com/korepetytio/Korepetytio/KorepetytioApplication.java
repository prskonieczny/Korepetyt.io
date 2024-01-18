package com.korepetytio.Korepetytio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KorepetytioApplication {

	public static void main(String[] args) {
		SpringApplication.run(KorepetytioApplication.class, args);
	}

}
