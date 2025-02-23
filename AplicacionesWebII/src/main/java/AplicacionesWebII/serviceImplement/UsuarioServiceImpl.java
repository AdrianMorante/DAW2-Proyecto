package AplicacionesWebII.serviceImplement;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import AplicacionesWebII.model.Usuario;
import AplicacionesWebII.repository.UsuarioRepository;
import AplicacionesWebII.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<?> registrarUsuario(Usuario usuario) {
        if (usuarioRepository.findOneByEmail(usuario.getEmail()).isPresent()) {
        	return ResponseEntity.badRequest().body(Map.of("message", "El email ya está registrado."));

        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuarioRepository.save(usuario);
        return ResponseEntity.ok(Map.of("message", "Usuario registrado correctamente."));
    }
}