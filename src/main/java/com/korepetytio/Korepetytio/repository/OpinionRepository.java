package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {

}
