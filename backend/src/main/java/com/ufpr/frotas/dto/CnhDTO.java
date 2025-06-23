package com.ufpr.frotas.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CnhDTO {
    private String numero;
    private String categoria;
    private String dataEmissao;
    private String validade;
    private String orgaoEmissor;
}

