package AplicacionesWebII.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import AplicacionesWebII.model.Empleado;

public interface EmpleadoService {
	
	public ResponseEntity<Map<String, Object>> listarEmpleados();

	public ResponseEntity<Map<String, Object>> listarEmpleadoPorId(Long id);

	public ResponseEntity<Map<String, Object>> agregarEmpleado(Empleado empleado);

	public ResponseEntity<Map<String, Object>> editarEmpleado(Empleado empleado, Long id);

	public ResponseEntity<Map<String, Object>> eliminarEmpleado(Long id);

}
