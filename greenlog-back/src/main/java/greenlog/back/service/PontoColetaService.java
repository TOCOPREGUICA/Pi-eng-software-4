/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package greenlog.back.service;

/**
 *
 * @author Kayque de Freitas <kayquefreitas08@gmail.com>
 * @data 04/06/2025
 * @brief Class PontoColetaService
 */

import greenlog.back.dto.PontoColetaCadastroDTO;
import greenlog.back.dto.PontoColetaResponseDTO;
import greenlog.back.model.PontoColeta;
import greenlog.back.repository.PontoColetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PontoColetaService {

    private final PontoColetaRepository pontoColetaRepository;

    @Autowired
    public PontoColetaService(PontoColetaRepository pontoColetaRepository) {
        this.pontoColetaRepository = pontoColetaRepository;
    }

    @Transactional
    public PontoColetaResponseDTO criarPontoColeta(PontoColetaCadastroDTO dto) {
        if (pontoColetaRepository.existsByNome(dto.getNome())) {
            throw new IllegalArgumentException("Já existe um ponto de coleta com o nome: " + dto.getNome());
        }

        PontoColeta novoPontoColeta = new PontoColeta();
        novoPontoColeta.setBairroId(dto.getBairroId());
        novoPontoColeta.setNome(dto.getNome());
        novoPontoColeta.setResponsavel(dto.getResponsavel());
        novoPontoColeta.setTelefoneResponsavel(dto.getTelefoneResponsavel());
        novoPontoColeta.setEmailResponsavel(dto.getEmailResponsavel());
        novoPontoColeta.setEndereco(dto.getEndereco());
        novoPontoColeta.setHorarioFuncionamento(dto.getHorarioFuncionamento());
        novoPontoColeta.setTiposResiduosAceitos(dto.getTiposResiduosAceitos());

        PontoColeta salvo = pontoColetaRepository.save(novoPontoColeta);
        return mapToResponseDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<PontoColetaResponseDTO> listarTodosPontosColeta() {
        return pontoColetaRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<PontoColetaResponseDTO> buscarPontoColetaPorId(Long id) {
        return pontoColetaRepository.findById(id).map(this::mapToResponseDTO);
    }

    @Transactional
    public Optional<PontoColetaResponseDTO> atualizarPontoColeta(Long id, PontoColetaCadastroDTO dto) {
        Optional<PontoColeta> existenteOptional = pontoColetaRepository.findById(id);
        if (existenteOptional.isEmpty()) {
            return Optional.empty();
        }

        Optional<PontoColeta> porNome = pontoColetaRepository.findByNome(dto.getNome());
        if (porNome.isPresent() && !porNome.get().getId().equals(id)) {
             throw new IllegalArgumentException("Já existe outro ponto de coleta com o nome: " + dto.getNome());
        }

        PontoColeta existente = existenteOptional.get();
        existente.setBairroId(dto.getBairroId());
        existente.setNome(dto.getNome());
        existente.setResponsavel(dto.getResponsavel());
        existente.setTelefoneResponsavel(dto.getTelefoneResponsavel());
        existente.setEmailResponsavel(dto.getEmailResponsavel());
        existente.setEndereco(dto.getEndereco());
        existente.setHorarioFuncionamento(dto.getHorarioFuncionamento());
        existente.setTiposResiduosAceitos(dto.getTiposResiduosAceitos());

        PontoColeta atualizado = pontoColetaRepository.save(existente);
        return Optional.of(mapToResponseDTO(atualizado));
    }

    @Transactional
    public boolean deletarPontoColeta(Long id) {
        if (pontoColetaRepository.existsById(id)) {
            pontoColetaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private PontoColetaResponseDTO mapToResponseDTO(PontoColeta pontoColeta) {
        return new PontoColetaResponseDTO(
                pontoColeta.getId(),
                pontoColeta.getBairroId(),
                pontoColeta.getNome(),
                pontoColeta.getResponsavel(),
                pontoColeta.getTelefoneResponsavel(),
                pontoColeta.getEmailResponsavel(),
                pontoColeta.getEndereco(),
                pontoColeta.getHorarioFuncionamento(),
                pontoColeta.getTiposResiduosAceitos()
        );
    }
}