// Módulo de dominio: registro de reservas de un recurso limitado (RF-01).
// Reglas de negocio documentadas en docs/RF-01-registrar-reserva.md

export const HORA_APERTURA = 8 * 60; // 08:00 en minutos
export const HORA_CIERRE = 20 * 60; // 20:00 en minutos
export const DURACIONES_VALIDAS = [30, 60, 90, 120];

export class ErrorValidacion extends Error {
  constructor(codigo, mensaje) {
    super(mensaje);
    this.name = 'ErrorValidacion';
    this.codigo = codigo;
  }
}

export function aMinutos(hhmm) {
  if (typeof hhmm !== 'string' || !/^\d{2}:\d{2}$/.test(hhmm)) {
    throw new ErrorValidacion('RN-01', 'La hora debe tener el formato HH:MM');
  }
  const [h, m] = hhmm.split(':').map(Number);
  if (h > 23 || m > 59) {
    throw new ErrorValidacion('RN-01', 'La hora no es válida');
  }
  return h * 60 + m;
}

export function aHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

export class Agenda {
  constructor(recursos) {
    // recursos: { nombre: capacidad }
    this.recursos = { ...recursos };
    this.reservas = [];
    this.siguienteId = 1;
  }

  registrar(solicitud, ahora = new Date()) {
    const { recurso, fecha, horaInicio, duracion, personas, responsable } = solicitud ?? {};

    // RN-01 campos obligatorios
    const faltantes = Object.entries({ recurso, fecha, horaInicio, duracion, personas, responsable })
      .filter(([, v]) => v === undefined || v === null || v === '')
      .map(([k]) => k);
    if (faltantes.length > 0) {
      throw new ErrorValidacion('RN-01', `Faltan datos obligatorios: ${faltantes.join(', ')}`);
    }

    // RN-02 recurso existente
    if (!(recurso in this.recursos)) {
      throw new ErrorValidacion('RN-02', `El recurso "${recurso}" no existe`);
    }

    const inicio = aMinutos(horaInicio);

    // RN-03 no en el pasado
    const fechaHora = new Date(`${fecha}T${horaInicio}:00`);
    if (Number.isNaN(fechaHora.getTime())) {
      throw new ErrorValidacion('RN-01', 'La fecha no es válida');
    }
    if (fechaHora < ahora) {
      throw new ErrorValidacion('RN-03', 'No se puede reservar en una fecha u hora pasada');
    }

    // RN-04 duración permitida
    if (!DURACIONES_VALIDAS.includes(duracion)) {
      throw new ErrorValidacion('RN-04', 'La duración debe ser 30, 60, 90 o 120 minutos');
    }

    // RN-05 horario de atención
    const fin = inicio + duracion;
    if (inicio < HORA_APERTURA || inicio >= HORA_CIERRE) {
      throw new ErrorValidacion('RN-05', 'La reserva debe estar entre las 08:00 y las 20:00');
    }

    // RN-06 capacidad
    const capacidad = this.recursos[recurso];
    if (!Number.isInteger(personas) || personas < 1 || personas > capacidad) {
      throw new ErrorValidacion('RN-06', `La cantidad de personas debe estar entre 1 y ${capacidad}`);
    }

    // RN-07 sin traslape
    const choque = this.reservas.find(
      (r) => r.estado === 'ACTIVA' && r.recurso === recurso && r.fecha === fecha &&
        inicio < r.fin && r.inicio < fin
    );
    if (choque) {
      throw new ErrorValidacion('RN-07', `Se traslapa con la reserva #${choque.id} (${aHora(choque.inicio)}-${aHora(choque.fin)})`);
    }

    const reserva = {
      id: this.siguienteId++,
      recurso, fecha, inicio, fin, personas,
      responsable: responsable.trim(),
      estado: 'ACTIVA',
    };
    this.reservas.push(reserva);
    return { ...reserva, horaInicio: aHora(inicio), horaFin: aHora(fin) };
  }

  cancelar(id) {
    const reserva = this.reservas.find((r) => r.id === id);
    if (!reserva) throw new ErrorValidacion('FA-02', `No existe la reserva #${id}`);
    if (reserva.estado !== 'ACTIVA') throw new ErrorValidacion('FA-02', `La reserva #${id} ya estaba cancelada`);
    reserva.estado = 'CANCELADA';
    return reserva;
  }

  listar(recurso, fecha) {
    return this.reservas
      .filter((r) => r.estado === 'ACTIVA' && r.recurso === recurso && r.fecha === fecha)
      .sort((a, b) => a.inicio - b.inicio)
      .map((r) => ({ ...r, horaInicio: aHora(r.inicio), horaFin: aHora(r.fin) }));
  }
}
