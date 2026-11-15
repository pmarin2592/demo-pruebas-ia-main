import { describe, it, expect } from 'vitest';
import {
  aMinutos,
  aHora,
  Agenda,
  ErrorValidacion,
  HORA_APERTURA,
  HORA_CIERRE,
  DURACIONES_VALIDAS,
} from '../../src/reservas.js';

const AHORA = new Date('2030-01-01T08:00:00');
const FECHA_FUTURA = '2030-01-10';

function crearSolicitud(cambios = {}) {
  return {
    recurso: 'Sala A',
    fecha: FECHA_FUTURA,
    horaInicio: '10:00',
    duracion: 60,
    personas: 4,
    responsable: 'Ana',
    ...cambios,
  };
}

function esperarCodigoError(accion, codigo) {
  let error;
  try {
    accion();
  } catch (capturado) {
    error = capturado;
  }
  expect(error).toBeInstanceOf(ErrorValidacion);
  expect(error.codigo).toBe(codigo);
}

describe('conversiones de hora', () => {
  it('convierte una hora HH:MM a minutos desde medianoche', () => {
    expect(aMinutos('00:00')).toBe(0);
    expect(aMinutos('08:00')).toBe(HORA_APERTURA);
    expect(aMinutos('20:00')).toBe(HORA_CIERRE);
    expect(aMinutos('23:59')).toBe(1439);
  });

  it.each([null, undefined, 800, '8:00', '08:0', '08:00:00', 'ab:cd'])(
    'rechaza una hora con formato incorrecto: %s',
    (hora) => {
      esperarCodigoError(() => aMinutos(hora), 'RN-01');
    },
  );

  it.each(['24:00', '08:60', '99:99'])(
    'rechaza una hora fuera de rango: %s',
    (hora) => {
      esperarCodigoError(() => aMinutos(hora), 'RN-01');
    },
  );

  it('formatea minutos como HH:MM', () => {
    expect(aHora(0)).toBe('00:00');
    expect(aHora(8 * 60)).toBe('08:00');
    expect(aHora(12 * 60 + 5)).toBe('12:05');
    expect(aHora(20 * 60)).toBe('20:00');
  });
});

describe('constantes de reservas', () => {
  it('expone el horario y las duraciones permitidas', () => {
    expect(HORA_APERTURA).toBe(480);
    expect(HORA_CIERRE).toBe(1200);
    expect(DURACIONES_VALIDAS).toEqual([30, 60, 90, 120]);
  });
});

describe('Agenda', () => {
  it('registra una reserva válida con identificador y horas formateadas', () => {
    const agenda = new Agenda({ 'Sala A': 10 });

    const reserva = agenda.registrar(crearSolicitud(), AHORA);

    expect(reserva).toEqual({
      id: 1,
      recurso: 'Sala A',
      fecha: FECHA_FUTURA,
      inicio: 600,
      fin: 660,
      personas: 4,
      responsable: 'Ana',
      estado: 'ACTIVA',
      horaInicio: '10:00',
      horaFin: '11:00',
    });
    expect(agenda.reservas).toHaveLength(1);
  });

  it('asigna identificadores consecutivos y elimina espacios del responsable', () => {
    const agenda = new Agenda({ 'Sala A': 10 });

    const primera = agenda.registrar(crearSolicitud({ responsable: '  Ana  ' }), AHORA);
    const segunda = agenda.registrar(
      crearSolicitud({ horaInicio: '11:00' }),
      AHORA,
    );

    expect(primera.responsable).toBe('Ana');
    expect(segunda.id).toBe(2);
  });

  it('rechaza la solicitud nula con RN-01', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(() => agenda.registrar(null, AHORA), 'RN-01');
  });

  it.each([
    ['recurso', undefined],
    ['fecha', undefined],
    ['horaInicio', undefined],
    ['duracion', undefined],
    ['personas', undefined],
    ['responsable', undefined],
    ['responsable vacío', ''],
  ])('rechaza el campo obligatorio faltante: %s', (campo, valor) => {
    const agenda = new Agenda({ 'Sala A': 10 });
    const solicitud = crearSolicitud();
    delete solicitud[campo];
    if (campo === 'responsable vacío') solicitud.responsable = valor;

    esperarCodigoError(() => agenda.registrar(solicitud, AHORA), 'RN-01');
    expect(agenda.reservas).toHaveLength(0);
  });

  it('rechaza un recurso que no existe con RN-02', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(
      () => agenda.registrar(crearSolicitud({ recurso: 'Sala Z' }), AHORA),
      'RN-02',
    );
  });

  it('rechaza fechas y horas pasadas con RN-03', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(
      () =>
        agenda.registrar(
          crearSolicitud({ fecha: '2029-12-31', horaInicio: '10:00' }),
          AHORA,
        ),
      'RN-03',
    );
    esperarCodigoError(
      () =>
        agenda.registrar(
          crearSolicitud({ fecha: '2030-01-01', horaInicio: '07:59' }),
          AHORA,
        ),
      'RN-03',
    );
  });

  it('permite una reserva que inicia exactamente ahora', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    const ahora = new Date('2030-01-10T10:00:00');

    expect(
      agenda.registrar(
        crearSolicitud({ fecha: '2030-01-10', horaInicio: '10:00' }),
        ahora,
      ).estado,
    ).toBe('ACTIVA');
  });

  it('rechaza una fecha no válida con RN-01', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(
      () =>
        agenda.registrar(
          crearSolicitud({ fecha: 'fecha-inválida' }),
          AHORA,
        ),
      'RN-01',
    );
  });

  it.each([
    [30, true],
    [60, true],
    [90, true],
    [120, true],
    [45, false],
    [150, false],
  ])('valida la duración de %i minutos', (duracion, valida) => {
    const agenda = new Agenda({ 'Sala A': 10 });
    const solicitud = crearSolicitud({ duracion });

    if (valida) {
      expect(agenda.registrar(solicitud, AHORA).estado).toBe('ACTIVA');
    } else {
      esperarCodigoError(() => agenda.registrar(solicitud, AHORA), 'RN-04');
    }
  });

  it.each([
    ['07:59', 30],
    ['20:00', 30],
    ['19:30', 60],
  ])('rechaza una reserva fuera del horario: %s por %i minutos', (horaInicio, duracion) => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(
      () =>
        agenda.registrar(crearSolicitud({ horaInicio, duracion }), AHORA),
      'RN-05',
    );
  });

  it('permite iniciar a las 08:00 y terminar exactamente a las 20:00', () => {
    const agenda = new Agenda({ 'Sala A': 10 });

    const primera = agenda.registrar(
      crearSolicitud({ horaInicio: '08:00', duracion: 30 }),
      AHORA,
    );
    const ultima = agenda.registrar(
      crearSolicitud({ horaInicio: '18:00', duracion: 120 }),
      AHORA,
    );

    expect(primera.horaInicio).toBe('08:00');
    expect(ultima.horaFin).toBe('20:00');
  });

  it.each([0, -1, 11, 1.5, '4'])(
    'rechaza una cantidad de personas inválida: %s',
    (personas) => {
      const agenda = new Agenda({ 'Sala A': 10 });
      esperarCodigoError(
        () => agenda.registrar(crearSolicitud({ personas }), AHORA),
        'RN-06',
      );
    },
  );

  it('acepta los límites de capacidad del recurso', () => {
    const agenda = new Agenda({ 'Sala A': 10 });

    expect(
      agenda.registrar(crearSolicitud({ personas: 1 }), AHORA).personas,
    ).toBe(1);
    expect(
      agenda.registrar(
        crearSolicitud({ horaInicio: '11:00', personas: 10 }),
        AHORA,
      ).personas,
    ).toBe(10);
  });

  it('rechaza reservas que se traslapan en el mismo recurso y fecha', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    agenda.registrar(crearSolicitud(), AHORA);

    esperarCodigoError(
      () =>
        agenda.registrar(
          crearSolicitud({ horaInicio: '10:30' }),
          AHORA,
        ),
      'RN-07',
    );
    expect(agenda.reservas).toHaveLength(1);
  });

  it('permite reservas contiguas', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    agenda.registrar(crearSolicitud(), AHORA);

    const siguiente = agenda.registrar(
      crearSolicitud({ horaInicio: '11:00' }),
      AHORA,
    );

    expect(siguiente.horaInicio).toBe('11:00');
    expect(siguiente.horaFin).toBe('12:00');
  });

  it('no considera traslapes en otros recursos o fechas', () => {
    const agenda = new Agenda({ 'Sala A': 10, 'Sala B': 8 });
    agenda.registrar(crearSolicitud(), AHORA);

    expect(
      agenda.registrar(
        crearSolicitud({ recurso: 'Sala B' }),
        AHORA,
      ).estado,
    ).toBe('ACTIVA');
    expect(
      agenda.registrar(
        crearSolicitud({ fecha: '2030-01-11' }),
        AHORA,
      ).estado,
    ).toBe('ACTIVA');
  });

  it('rechaza la cancelación de una reserva inexistente', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    esperarCodigoError(() => agenda.cancelar(1), 'FA-02');
  });

  it('cancela una reserva activa y rechaza cancelarla por segunda vez', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    agenda.registrar(crearSolicitud(), AHORA);

    expect(agenda.cancelar(1).estado).toBe('CANCELADA');
    esperarCodigoError(() => agenda.cancelar(1), 'FA-02');
  });

  it('permite reservar de nuevo el horario después de cancelar', () => {
    const agenda = new Agenda({ 'Sala A': 10 });
    agenda.registrar(crearSolicitud(), AHORA);
    agenda.cancelar(1);

    const nueva = agenda.registrar(crearSolicitud(), AHORA);

    expect(nueva.id).toBe(2);
    expect(nueva.estado).toBe('ACTIVA');
  });

  it('lista solo las reservas activas del recurso y fecha en orden de inicio', () => {
    const agenda = new Agenda({ 'Sala A': 10, 'Sala B': 8 });
    agenda.registrar(crearSolicitud({ horaInicio: '12:00' }), AHORA);
    agenda.registrar(crearSolicitud({ horaInicio: '10:00' }), AHORA);
    agenda.registrar(
      crearSolicitud({ recurso: 'Sala B', horaInicio: '11:00' }),
      AHORA,
    );
    agenda.registrar(
      crearSolicitud({ fecha: '2030-01-11', horaInicio: '11:00' }),
      AHORA,
    );
    agenda.cancelar(1);

    const reservas = agenda.listar('Sala A', FECHA_FUTURA);

    expect(reservas).toHaveLength(1);
    expect(reservas[0]).toMatchObject({
      id: 2,
      horaInicio: '10:00',
      horaFin: '11:00',
      estado: 'ACTIVA',
    });
    expect(agenda.listar('Sala inexistente', FECHA_FUTURA)).toEqual([]);
    const otraFecha = agenda.listar('Sala A', '2030-01-11');
    expect(otraFecha).toHaveLength(1);
    expect(otraFecha[0]).toMatchObject({ id: 4, horaInicio: '11:00', horaFin: '12:00' });
  });
});
