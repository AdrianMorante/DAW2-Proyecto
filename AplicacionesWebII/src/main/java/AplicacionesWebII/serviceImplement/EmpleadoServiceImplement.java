package AplicacionesWebII.serviceImplement;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import AplicacionesWebII.model.Empleado;
import AplicacionesWebII.repository.EmpleadoRepository;
import AplicacionesWebII.service.EmpleadoService;

@Service
public class EmpleadoServiceImplement implements EmpleadoService{
	
	@Autowired
	private EmpleadoRepository dao;
	
	@Override
	public ResponseEntity<Map<String, Object>> listarEmpleados() {
		Map<String,Object> respuesta = new HashMap<>();	
		List<Empleado> empleados = dao.findAll();
		
		if(!empleados.isEmpty()) {
			respuesta.put("mensaje", "Lista de empleados");
			respuesta.put("empleados", empleados);
			respuesta.put("status", HttpStatus.OK.value());
			respuesta.put("fecha", new Date());	
			return ResponseEntity.ok(respuesta);
		}else {
			respuesta.put("mensaje", "No existen registros");
			respuesta.put("status", HttpStatus.NOT_FOUND.value());
			respuesta.put("fecha", new Date());	
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
		}
		
	}

	@Override
	public ResponseEntity<Map<String, Object>> listarEmpleadoPorId(Long id) {
		Map<String, Object> respuesta = new HashMap<>();
        Optional<Empleado> empleado = dao.findById(id);

        if (empleado.isPresent()) {
            respuesta.put("empleado", empleado.get());
            respuesta.put("mensaje", "Búsqueda correcta");
            respuesta.put("status", HttpStatus.OK.value());
            respuesta.put("fecha", new Date());	
            return ResponseEntity.ok().body(respuesta);
        } else {
            respuesta.put("mensaje", "Sin registros con ID: " + id);
            respuesta.put("status", HttpStatus.NOT_FOUND.value());
            respuesta.put("fecha", new Date());	
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
        }
	}

	@Override
	public ResponseEntity<Map<String, Object>> agregarEmpleado(Empleado empleado) {
	    Map<String, Object> respuesta = new HashMap<>();
	    String nombreSimbolos = "^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$";

	    if (!empleado.getNombre().matches(nombreSimbolos)) {
	        respuesta.put("mensaje", "El nombre solo puede contener letras y espacios");
	        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	    }

	    if (!empleado.getApellido().matches(nombreSimbolos)) {
	        respuesta.put("mensaje", "El apellido solo puede contener letras y espacios");
	        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	    }

	    if (!empleado.getPuesto().matches(nombreSimbolos)) { 
	        respuesta.put("mensaje", "El puesto solo puede contener letras y espacios");
	        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	    }

	    if (empleado.getSalario() == null || empleado.getSalario() < 0) {
	        respuesta.put("mensaje", "El salario no puede ser negativo");
	        respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	    }

	    dao.save(empleado);
	    respuesta.put("empleado", empleado);
	    respuesta.put("mensaje", "Se registró correctamente al empleado");
	    respuesta.put("status", HttpStatus.CREATED.value());
	    respuesta.put("fecha", new Date());
	    return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
	}


	@Override
	public ResponseEntity<Map<String, Object>> editarEmpleado(Empleado emp, Long id) {
		Map<String, Object> respuesta = new HashMap<>();
	    Optional<Empleado> empleadoExiste = dao.findById(id);

	    if (empleadoExiste.isPresent()) {
	        Empleado empleado = empleadoExiste.get();

	        if (emp.getNombre() == null || !emp.getNombre().matches("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")) {
	            respuesta.put("mensaje", "El nombre solo puede contener letras y espacios");
	            respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	            respuesta.put("fecha", new Date());
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	        }

	        if (emp.getApellido() == null || !emp.getApellido().matches("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")) {
	            respuesta.put("mensaje", "El apellido solo puede contener letras y espacios");
	            respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	            respuesta.put("fecha", new Date());
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	        }

	        if (emp.getPuesto() == null || !emp.getPuesto().matches("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")) {
	            respuesta.put("mensaje", "El puesto solo puede contener letras y espacios");
	            respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	            respuesta.put("fecha", new Date());
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	        }

	        if (emp.getSalario() == null || emp.getSalario() < 0) {
	            respuesta.put("mensaje", "El salario no puede ser negativo");
	            respuesta.put("status", HttpStatus.BAD_REQUEST.value());
	            respuesta.put("fecha", new Date());
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(respuesta);
	        }

	        empleado.setNombre(emp.getNombre());
	        empleado.setApellido(emp.getApellido());
	        empleado.setPuesto(emp.getPuesto());
	        empleado.setSalario(emp.getSalario());

	        dao.save(empleado); 

	        respuesta.put("empleado", empleado);
	        respuesta.put("mensaje", "Datos del empleado modificados correctamente");
	        respuesta.put("status", HttpStatus.CREATED.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);

	    } else {
	        respuesta.put("mensaje", "Sin registros con ID: " + id);
	        respuesta.put("status", HttpStatus.NOT_FOUND.value());
	        respuesta.put("fecha", new Date());
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
	    }
	}

	@Override
	public ResponseEntity<Map<String, Object>> eliminarEmpleado(Long id) {
		Map<String,Object> respuesta = new HashMap<>();	
		Optional<Empleado> empleadoExistente = dao.findById(id);	
		if (empleadoExistente.isPresent()) {
			Empleado empleado = empleadoExistente.get();
			dao.delete(empleado);
			respuesta.put("mensaje", "Eliminado correctamente");
			respuesta.put("status", HttpStatus.NO_CONTENT);
			respuesta.put("fecha", new Date());	

			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(respuesta);
		}else {
			respuesta.put("mensaje", "Sin registros con ID: " + id);
			respuesta.put("status", HttpStatus.NOT_FOUND);
			respuesta.put("fecha", new Date());	
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(respuesta);
		}
	}

}
