package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.entities.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByPermissionLevel(RoleType permissionLevel);
}
