// Capturamos los elementos del HTML
const inputNombre = document.getElementById("nombreP");
const inputOxigeno = document.getElementById("oxigenoP");
const inputRitmo = document.getElementById("ritmoP");
const btnRegistrar = document.getElementById("btnRegistrar");
const tablaPacientes = document.getElementById("listaPacientes");

// Evento para cuando la página cargue por completo
document.addEventListener("DOMContentLoaded", cargarPacientes);

// Evento para el botón de registrar
btnRegistrar.addEventListener("click", registrarPaciente);

// 1. Definimos la Clase Paciente
class Paciente {
    constructor(nombre, oxigeno, ritmo, riesgo) {
        this.nombre = nombre;
        this.oxigeno = oxigeno;
        this.ritmo = ritmo;
        this.riesgo = riesgo;
    }
}

// Función principal para registrar un nuevo paciente
function registrarPaciente() {
    const nombre = inputNombre.value.trim();
    const oxigeno = Number(inputOxigeno.value);
    const ritmo = Number(inputRitmo.value);

    // Validar que los campos no estén vacíos o inválidos
    if (nombre === "" || inputOxigeno.value === "" || inputRitmo.value === "") {
        return alert("Por favor, llena todos los campos.");
    }

    // 2. Determinar el nivel de riesgo usando estructuras de control (if/else)
    let riesgo = "";
    let claseColor = ""; // Para darle estilo con Bootstrap en la tabla

    if (oxigeno < 90 || ritmo > 130) {
        riesgo = "Rojo (Crítico)";
        claseColor = "table-danger";
    } else if (oxigeno >= 90 && oxigeno <= 94) {
        riesgo = "Amarillo (Urgente)";
        claseColor = "table-warning";
    } else {
        riesgo = "Verde (Estable)";
        claseColor = "table-success";
    }

    // Creamos el objeto paciente usando la clase
    const nuevoPaciente = new Paciente(nombre, oxigeno, ritmo, riesgo);
    // Le guardamos la clase de color temporalmente para renderizarla fácil
    nuevoPaciente.claseColor = claseColor;

    // 3. Usar LocalStorage para guardar
    const pacientes = obtenerPacientes();
    pacientes.push(nuevoPaciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    // Limpiar los inputs y actualizar la tabla
    inputNombre.value = "";
    inputOxigeno.value = "";
    inputRitmo.value = "";
    mostrarPacientes();
}

// Obtener pacientes desde el LocalStorage usando getItem
function obtenerPacientes() {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

// Renderizar / Mostrar los pacientes en la tabla usando innerHTML y un ciclo for clásico
function mostrarPacientes() {
    const pacientes = obtenerPacientes();
    tablaPacientes.innerHTML = "";

    // Usamos un ciclo for clásico para recorrer el arreglo
    for (let i = 0; i < pacientes.length; i++) {
        const p = pacientes[i];
        
        // Creamos la fila (tr) de la tabla dinámicamente
        const fila = document.createElement("tr");
        fila.className = p.claseColor || ""; // Aplicamos el color de alerta

        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.oxigeno}%</td>
            <td>${p.ritmo} lpm</td>
            <td><strong>${p.riesgo}</strong></td>
        `;

        tablaPacientes.appendChild(fila);
    }
}

// Función para cargar los pacientes guardados al iniciar la app
function cargarPacientes() {
    mostrarPacientes();
}