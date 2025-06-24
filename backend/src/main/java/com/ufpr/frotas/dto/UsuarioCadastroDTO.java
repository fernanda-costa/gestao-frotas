package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.entity.Cnh;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UsuarioCadastroDTO {
    private String nome;
    private String email;
    private String senha;
    private String telefone;

    private String cpf;
    private CnhDTO cnh;
    private String validadeCnh;

    private EnderecoDTO endereco;
}
