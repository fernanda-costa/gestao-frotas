package com.ufpr.frotas.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ADMIN")
@Getter @Setter
@NoArgsConstructor
public class Admin extends Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean ativo = true;
}
