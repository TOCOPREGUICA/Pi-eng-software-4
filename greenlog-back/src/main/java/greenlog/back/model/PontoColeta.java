/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package greenlog.back.model;

/**
 *
 * @author Kayque de Freitas <kayquefreitas08@gmail.com>
 * @data 04/06/2025
 * @brief Class PontoColeta
 */

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Table(name = "pontos_coleta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PontoColeta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pontos_coleta_id_seq")
    @SequenceGenerator(name = "pontos_coleta_id_seq", sequenceName = "pontos_coleta_id_SEQ", allocationSize = 1)
    private Long id;

    @Column(name = "bairro_id") 
    private Long bairroId; 

    @Column(nullable = false, unique = true, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String responsavel; 

    @Column(length = 20)
    private String telefoneResponsavel;

    @Column(length = 100)
    private String emailResponsavel;

    @Column(length = 255)
    private String endereco; 

    @Column(length = 100)
    private String horarioFuncionamento; 

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "ponto_coleta_tipos_residuos", joinColumns = @JoinColumn(name = "ponto_coleta_id"))
    @Column(name = "tipo_residuo")
    private List<String> tiposResiduosAceitos;
}