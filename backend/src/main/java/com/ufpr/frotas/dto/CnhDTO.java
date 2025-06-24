package com.ufpr.frotas.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class CnhDTO {
    private String numCnh;
    private String categoria;
    private LocalDate dataEmissao;
    private LocalDate validade;
    private String orgaoEmissor;
}

