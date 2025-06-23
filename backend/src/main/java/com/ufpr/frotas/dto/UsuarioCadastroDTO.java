package com.ufpr.frotas.dto;

import com.ufpr.frotas.model.entity.Cnh;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
