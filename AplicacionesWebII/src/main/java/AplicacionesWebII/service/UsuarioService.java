package AplicacionesWebII.service;

import org.springframework.http.ResponseEntity;
import AplicacionesWebII.model.Usuario;

public interface UsuarioService {
    ResponseEntity<?> registrarUsuario(Usuario usuario);
}
