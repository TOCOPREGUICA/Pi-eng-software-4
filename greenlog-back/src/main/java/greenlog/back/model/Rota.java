/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package greenlog.back.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.Date;


/**
 *
 * @author Cansei2
 */
@Entity
@Table(name = "rotas")
public class Rota {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rota_seq")
    @SequenceGenerator(name = "rota_seq", sequenceName = "rotas_SEQ", allocationSize = 1)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "caminhao_id", referencedColumnName = "id") // chave estrangeira
    private Caminhao caminhao;

    private Date data;
    private String origem;
    private String destino;

    public Rota() {}

    public Rota(Integer id, Caminhao caminhao, Date data, String origem, String destino) {
        this.id = id;
        this.caminhao = caminhao;
        this.data = data;
        this.origem = origem;
        this.destino = destino;
    }

    public Caminhao getCaminhao() {
        return caminhao;
    }

    public void setCaminhao(Caminhao caminhao) {
        this.caminhao = caminhao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
