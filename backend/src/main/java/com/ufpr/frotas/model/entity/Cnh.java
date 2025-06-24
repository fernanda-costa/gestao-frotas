package com.ufpr.frotas.model.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.LocalDate;

@Embeddable
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Cnh {
    private String numCnh;
    private String categoria;
    private LocalDate validade;
}

