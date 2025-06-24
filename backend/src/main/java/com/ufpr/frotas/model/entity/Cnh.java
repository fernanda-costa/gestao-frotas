package com.ufpr.frotas.model.entity;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Embeddable
public class Cnh {
    private String numCnh;
    private String categoria;
    private LocalDate dataEmissao;
    private LocalDate validade;
    private String orgaoEmissor;
}
