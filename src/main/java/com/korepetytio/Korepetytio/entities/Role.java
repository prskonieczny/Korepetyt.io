package com.korepetytio.Korepetytio.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Role extends AbstractEntity{
    @Enumerated(EnumType.STRING)
    @Column(name = "permission_level", updatable = false)
    private RoleType permissionLevel;
}
