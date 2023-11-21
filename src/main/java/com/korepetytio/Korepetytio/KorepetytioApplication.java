package com.korepetytio.Korepetytio;

import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.List;



@SpringBootApplication
public class KorepetytioApplication {

	@Autowired
	private AccountRepository accountRepository;
	@EventListener(ApplicationReadyEvent.class)
	public void runAfterStartup() {
		Account account = new Account();
		account.setUsername("username");
		account.setPassword("password");
		account.setEmail("email@email.com");
		this.accountRepository.save(account);
		List<Account> allAccounts = this.accountRepository.findAll();
	}

	public static void main(String[] args) {
		SpringApplication.run(KorepetytioApplication.class, args);
	}

}
