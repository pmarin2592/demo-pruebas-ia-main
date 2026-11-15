// @ts-nocheck
// Módulo de dominio: registro de reservas de un recurso limitado (RF-01).
// Reglas de negocio documentadas en docs/RF-01-registrar-reserva.md
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export const HORA_APERTURA = stryMutAct_9fa48("0") ? 8 / 60 : (stryCov_9fa48("0"), 8 * 60); // 08:00 en minutos
export const HORA_CIERRE = stryMutAct_9fa48("1") ? 20 / 60 : (stryCov_9fa48("1"), 20 * 60); // 20:00 en minutos
export const DURACIONES_VALIDAS = stryMutAct_9fa48("2") ? [] : (stryCov_9fa48("2"), [30, 60, 90, 120]);
export class ErrorValidacion extends Error {
  constructor(codigo, mensaje) {
    if (stryMutAct_9fa48("3")) {
      {}
    } else {
      stryCov_9fa48("3");
      super(mensaje);
      this.name = stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), 'ErrorValidacion');
      this.codigo = codigo;
    }
  }
}
export function aMinutos(hhmm) {
  if (stryMutAct_9fa48("5")) {
    {}
  } else {
    stryCov_9fa48("5");
    if (stryMutAct_9fa48("8") ? typeof hhmm !== 'string' && !/^\d{2}:\d{2}$/.test(hhmm) : stryMutAct_9fa48("7") ? false : stryMutAct_9fa48("6") ? true : (stryCov_9fa48("6", "7", "8"), (stryMutAct_9fa48("10") ? typeof hhmm === 'string' : stryMutAct_9fa48("9") ? false : (stryCov_9fa48("9", "10"), typeof hhmm !== (stryMutAct_9fa48("11") ? "" : (stryCov_9fa48("11"), 'string')))) || (stryMutAct_9fa48("12") ? /^\d{2}:\d{2}$/.test(hhmm) : (stryCov_9fa48("12"), !(stryMutAct_9fa48("18") ? /^\d{2}:\D{2}$/ : stryMutAct_9fa48("17") ? /^\d{2}:\d$/ : stryMutAct_9fa48("16") ? /^\D{2}:\d{2}$/ : stryMutAct_9fa48("15") ? /^\d:\d{2}$/ : stryMutAct_9fa48("14") ? /^\d{2}:\d{2}/ : stryMutAct_9fa48("13") ? /\d{2}:\d{2}$/ : (stryCov_9fa48("13", "14", "15", "16", "17", "18"), /^\d{2}:\d{2}$/)).test(hhmm))))) {
      if (stryMutAct_9fa48("19")) {
        {}
      } else {
        stryCov_9fa48("19");
        throw new ErrorValidacion(stryMutAct_9fa48("21") ? "" : (stryCov_9fa48("21"), 'RN-01'), stryMutAct_9fa48("22") ? "" : (stryCov_9fa48("22"), 'La hora debe tener el formato HH:MM'));
      }
    }
    const [h, m] = hhmm.split(stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), ':')).map(Number);
    if (stryMutAct_9fa48("26") ? h > 23 && m > 59 : stryMutAct_9fa48("25") ? false : stryMutAct_9fa48("24") ? true : (stryCov_9fa48("24", "25", "26"), (stryMutAct_9fa48("29") ? h <= 23 : stryMutAct_9fa48("28") ? h >= 23 : stryMutAct_9fa48("27") ? false : (stryCov_9fa48("27", "28", "29"), h > 23)) || (stryMutAct_9fa48("32") ? m <= 59 : stryMutAct_9fa48("31") ? m >= 59 : stryMutAct_9fa48("30") ? false : (stryCov_9fa48("30", "31", "32"), m > 59)))) {
      if (stryMutAct_9fa48("33")) {
        {}
      } else {
        stryCov_9fa48("33");
        throw new ErrorValidacion(stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), 'RN-01'), stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), 'La hora no es válida'));
      }
    }
    return stryMutAct_9fa48("37") ? h * 60 - m : (stryCov_9fa48("37"), (stryMutAct_9fa48("38") ? h / 60 : (stryCov_9fa48("38"), h * 60)) + m);
  }
}
export function aHora(minutos) {
  if (stryMutAct_9fa48("39")) {
    {}
  } else {
    stryCov_9fa48("39");
    const h = String(Math.floor(stryMutAct_9fa48("40") ? minutos * 60 : (stryCov_9fa48("40"), minutos / 60))).padStart(2, stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), '0'));
    const m = String(stryMutAct_9fa48("42") ? minutos * 60 : (stryCov_9fa48("42"), minutos % 60)).padStart(2, stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), '0'));
    return stryMutAct_9fa48("44") ? `` : (stryCov_9fa48("44"), `${h}:${m}`);
  }
}
export class Agenda {
  constructor(recursos) {
    if (stryMutAct_9fa48("45")) {
      {}
    } else {
      stryCov_9fa48("45");
      // recursos: { nombre: capacidad }
      this.recursos = stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
        ...recursos
      });
      this.reservas = stryMutAct_9fa48("47") ? ["Stryker was here"] : (stryCov_9fa48("47"), []);
      this.siguienteId = 1;
    }
  }
  registrar(solicitud, ahora = new Date()) {
    if (stryMutAct_9fa48("48")) {
      {}
    } else {
      stryCov_9fa48("48");
      const {
        recurso,
        fecha,
        horaInicio,
        duracion,
        personas,
        responsable
      } = stryMutAct_9fa48("49") ? solicitud && {} : (stryCov_9fa48("49"), solicitud ?? {});

      // RN-01 campos obligatorios
      const faltantes = stryMutAct_9fa48("50") ? Object.entries({
        recurso,
        fecha,
        horaInicio,
        duracion,
        personas,
        responsable
      }).map(([k]) => k) : (stryCov_9fa48("50"), Object.entries(stryMutAct_9fa48("51") ? {} : (stryCov_9fa48("51"), {
        recurso,
        fecha,
        horaInicio,
        duracion,
        personas,
        responsable
      })).filter(stryMutAct_9fa48("52") ? () => undefined : (stryCov_9fa48("52"), ([, v]) => stryMutAct_9fa48("55") ? (v === undefined || v === null) && v === '' : stryMutAct_9fa48("54") ? false : stryMutAct_9fa48("53") ? true : (stryCov_9fa48("53", "54", "55"), (stryMutAct_9fa48("57") ? v === undefined && v === null : stryMutAct_9fa48("56") ? false : (stryCov_9fa48("56", "57"), (stryMutAct_9fa48("59") ? v !== undefined : stryMutAct_9fa48("58") ? false : (stryCov_9fa48("58", "59"), v === undefined)) || (stryMutAct_9fa48("61") ? v !== null : stryMutAct_9fa48("60") ? false : (stryCov_9fa48("60", "61"), v === null)))) || (stryMutAct_9fa48("63") ? v !== '' : stryMutAct_9fa48("62") ? false : (stryCov_9fa48("62", "63"), v === (stryMutAct_9fa48("64") ? "Stryker was here!" : (stryCov_9fa48("64"), ''))))))).map(stryMutAct_9fa48("65") ? () => undefined : (stryCov_9fa48("65"), ([k]) => k)));
      if (stryMutAct_9fa48("69") ? faltantes.length <= 0 : stryMutAct_9fa48("68") ? faltantes.length >= 0 : stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66", "67", "68", "69"), faltantes.length > 0)) {
        if (stryMutAct_9fa48("70")) {
          {}
        } else {
          stryCov_9fa48("70");
          throw new ErrorValidacion(stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), 'RN-01'), stryMutAct_9fa48("73") ? `` : (stryCov_9fa48("73"), `Faltan datos obligatorios: ${faltantes.join(stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), ', '))}`));
        }
      }

      // RN-02 recurso existente
      if (stryMutAct_9fa48("77") ? false : stryMutAct_9fa48("76") ? true : stryMutAct_9fa48("75") ? recurso in this.recursos : (stryCov_9fa48("75", "76", "77"), !(recurso in this.recursos))) {
        if (stryMutAct_9fa48("78")) {
          {}
        } else {
          stryCov_9fa48("78");
          throw new ErrorValidacion(stryMutAct_9fa48("80") ? "" : (stryCov_9fa48("80"), 'RN-02'), stryMutAct_9fa48("81") ? `` : (stryCov_9fa48("81"), `El recurso "${recurso}" no existe`));
        }
      }
      const inicio = aMinutos(horaInicio);

      // RN-03 no en el pasado
      const fechaHora = new Date(stryMutAct_9fa48("82") ? `` : (stryCov_9fa48("82"), `${fecha}T${horaInicio}:00`));
      if (stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84"), Number.isNaN(fechaHora.getTime()))) {
        if (stryMutAct_9fa48("85")) {
          {}
        } else {
          stryCov_9fa48("85");
          throw new ErrorValidacion(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), 'RN-01'), stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), 'La fecha no es válida'));
        }
      }
      if (stryMutAct_9fa48("92") ? fechaHora >= ahora : stryMutAct_9fa48("91") ? fechaHora <= ahora : stryMutAct_9fa48("90") ? false : stryMutAct_9fa48("89") ? true : (stryCov_9fa48("89", "90", "91", "92"), fechaHora < ahora)) {
        if (stryMutAct_9fa48("93")) {
          {}
        } else {
          stryCov_9fa48("93");
          throw new ErrorValidacion(stryMutAct_9fa48("95") ? "" : (stryCov_9fa48("95"), 'RN-03'), stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'No se puede reservar en una fecha u hora pasada'));
        }
      }

      // RN-04 duración permitida
      if (stryMutAct_9fa48("99") ? false : stryMutAct_9fa48("98") ? true : stryMutAct_9fa48("97") ? DURACIONES_VALIDAS.includes(duracion) : (stryCov_9fa48("97", "98", "99"), !DURACIONES_VALIDAS.includes(duracion))) {
        if (stryMutAct_9fa48("100")) {
          {}
        } else {
          stryCov_9fa48("100");
          throw new ErrorValidacion(stryMutAct_9fa48("102") ? "" : (stryCov_9fa48("102"), 'RN-04'), stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'La duración debe ser 30, 60, 90 o 120 minutos'));
        }
      }

      // RN-05 horario de atención
      const fin = stryMutAct_9fa48("104") ? inicio - duracion : (stryCov_9fa48("104"), inicio + duracion);
      if (stryMutAct_9fa48("107") ? inicio < HORA_APERTURA && inicio >= HORA_CIERRE : stryMutAct_9fa48("106") ? false : stryMutAct_9fa48("105") ? true : (stryCov_9fa48("105", "106", "107"), (stryMutAct_9fa48("110") ? inicio >= HORA_APERTURA : stryMutAct_9fa48("109") ? inicio <= HORA_APERTURA : stryMutAct_9fa48("108") ? false : (stryCov_9fa48("108", "109", "110"), inicio < HORA_APERTURA)) || (stryMutAct_9fa48("113") ? inicio < HORA_CIERRE : stryMutAct_9fa48("112") ? inicio > HORA_CIERRE : stryMutAct_9fa48("111") ? false : (stryCov_9fa48("111", "112", "113"), inicio >= HORA_CIERRE)))) {
        if (stryMutAct_9fa48("114")) {
          {}
        } else {
          stryCov_9fa48("114");
          throw new ErrorValidacion(stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), 'RN-05'), stryMutAct_9fa48("117") ? "" : (stryCov_9fa48("117"), 'La reserva debe estar entre las 08:00 y las 20:00'));
        }
      }

      // RN-06 capacidad
      const capacidad = this.recursos[recurso];
      if (stryMutAct_9fa48("120") ? (!Number.isInteger(personas) || personas < 1) && personas > capacidad : stryMutAct_9fa48("119") ? false : stryMutAct_9fa48("118") ? true : (stryCov_9fa48("118", "119", "120"), (stryMutAct_9fa48("122") ? !Number.isInteger(personas) && personas < 1 : stryMutAct_9fa48("121") ? false : (stryCov_9fa48("121", "122"), (stryMutAct_9fa48("123") ? Number.isInteger(personas) : (stryCov_9fa48("123"), !Number.isInteger(personas))) || (stryMutAct_9fa48("126") ? personas >= 1 : stryMutAct_9fa48("125") ? personas <= 1 : stryMutAct_9fa48("124") ? false : (stryCov_9fa48("124", "125", "126"), personas < 1)))) || (stryMutAct_9fa48("129") ? personas <= capacidad : stryMutAct_9fa48("128") ? personas >= capacidad : stryMutAct_9fa48("127") ? false : (stryCov_9fa48("127", "128", "129"), personas > capacidad)))) {
        if (stryMutAct_9fa48("130")) {
          {}
        } else {
          stryCov_9fa48("130");
          throw new ErrorValidacion(stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), 'RN-06'), stryMutAct_9fa48("133") ? `` : (stryCov_9fa48("133"), `La cantidad de personas debe estar entre 1 y ${capacidad}`));
        }
      }

      // RN-07 sin traslape
      const choque = this.reservas.find(stryMutAct_9fa48("134") ? () => undefined : (stryCov_9fa48("134"), r => stryMutAct_9fa48("137") ? r.estado === 'ACTIVA' && r.recurso === recurso && r.fecha === fecha && inicio < r.fin || r.inicio < fin : stryMutAct_9fa48("136") ? false : stryMutAct_9fa48("135") ? true : (stryCov_9fa48("135", "136", "137"), (stryMutAct_9fa48("139") ? r.estado === 'ACTIVA' && r.recurso === recurso && r.fecha === fecha || inicio < r.fin : stryMutAct_9fa48("138") ? true : (stryCov_9fa48("138", "139"), (stryMutAct_9fa48("141") ? r.estado === 'ACTIVA' && r.recurso === recurso || r.fecha === fecha : stryMutAct_9fa48("140") ? true : (stryCov_9fa48("140", "141"), (stryMutAct_9fa48("143") ? r.estado === 'ACTIVA' || r.recurso === recurso : stryMutAct_9fa48("142") ? true : (stryCov_9fa48("142", "143"), (stryMutAct_9fa48("145") ? r.estado !== 'ACTIVA' : stryMutAct_9fa48("144") ? true : (stryCov_9fa48("144", "145"), r.estado === (stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), 'ACTIVA')))) && (stryMutAct_9fa48("148") ? r.recurso !== recurso : stryMutAct_9fa48("147") ? true : (stryCov_9fa48("147", "148"), r.recurso === recurso)))) && (stryMutAct_9fa48("150") ? r.fecha !== fecha : stryMutAct_9fa48("149") ? true : (stryCov_9fa48("149", "150"), r.fecha === fecha)))) && (stryMutAct_9fa48("153") ? inicio >= r.fin : stryMutAct_9fa48("152") ? inicio <= r.fin : stryMutAct_9fa48("151") ? true : (stryCov_9fa48("151", "152", "153"), inicio < r.fin)))) && (stryMutAct_9fa48("156") ? r.inicio >= fin : stryMutAct_9fa48("155") ? r.inicio <= fin : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), r.inicio < fin)))));
      if (stryMutAct_9fa48("158") ? false : stryMutAct_9fa48("157") ? true : (stryCov_9fa48("157", "158"), choque)) {
        if (stryMutAct_9fa48("159")) {
          {}
        } else {
          stryCov_9fa48("159");
          throw new ErrorValidacion(stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), 'RN-07'), stryMutAct_9fa48("162") ? `` : (stryCov_9fa48("162"), `Se traslapa con la reserva #${choque.id} (${aHora(choque.inicio)}-${aHora(choque.fin)})`));
        }
      }
      const reserva = stryMutAct_9fa48("163") ? {} : (stryCov_9fa48("163"), {
        id: stryMutAct_9fa48("164") ? this.siguienteId-- : (stryCov_9fa48("164"), this.siguienteId++),
        recurso,
        fecha,
        inicio,
        fin,
        personas,
        responsable: stryMutAct_9fa48("165") ? responsable : (stryCov_9fa48("165"), responsable.trim()),
        estado: stryMutAct_9fa48("166") ? "" : (stryCov_9fa48("166"), 'ACTIVA')
      });
      if (stryMutAct_9fa48("167")) {
        ;
      } else {
        stryCov_9fa48("167");
        this.reservas.push(reserva);
      }
      return stryMutAct_9fa48("168") ? {} : (stryCov_9fa48("168"), {
        ...reserva,
        horaInicio: aHora(inicio),
        horaFin: aHora(fin)
      });
    }
  }
  cancelar(id) {
    if (stryMutAct_9fa48("169")) {
      {}
    } else {
      stryCov_9fa48("169");
      const reserva = this.reservas.find(stryMutAct_9fa48("170") ? () => undefined : (stryCov_9fa48("170"), r => stryMutAct_9fa48("173") ? r.id !== id : stryMutAct_9fa48("172") ? false : stryMutAct_9fa48("171") ? true : (stryCov_9fa48("171", "172", "173"), r.id === id)));
      if (stryMutAct_9fa48("176") ? false : stryMutAct_9fa48("175") ? true : stryMutAct_9fa48("174") ? reserva : (stryCov_9fa48("174", "175", "176"), !reserva)) throw new ErrorValidacion(stryMutAct_9fa48("178") ? "" : (stryCov_9fa48("178"), 'FA-02'), stryMutAct_9fa48("179") ? `` : (stryCov_9fa48("179"), `No existe la reserva #${id}`));
      if (stryMutAct_9fa48("182") ? reserva.estado === 'ACTIVA' : stryMutAct_9fa48("181") ? false : stryMutAct_9fa48("180") ? true : (stryCov_9fa48("180", "181", "182"), reserva.estado !== (stryMutAct_9fa48("183") ? "" : (stryCov_9fa48("183"), 'ACTIVA')))) throw new ErrorValidacion(stryMutAct_9fa48("185") ? "" : (stryCov_9fa48("185"), 'FA-02'), stryMutAct_9fa48("186") ? `` : (stryCov_9fa48("186"), `La reserva #${id} ya estaba cancelada`));
      reserva.estado = stryMutAct_9fa48("187") ? "" : (stryCov_9fa48("187"), 'CANCELADA');
      return reserva;
    }
  }
  listar(recurso, fecha) {
    if (stryMutAct_9fa48("188")) {
      {}
    } else {
      stryCov_9fa48("188");
      return stryMutAct_9fa48("190") ? this.reservas.sort((a, b) => a.inicio - b.inicio).map(r => ({
        ...r,
        horaInicio: aHora(r.inicio),
        horaFin: aHora(r.fin)
      })) : stryMutAct_9fa48("189") ? this.reservas.filter(r => r.estado === 'ACTIVA' && r.recurso === recurso && r.fecha === fecha).map(r => ({
        ...r,
        horaInicio: aHora(r.inicio),
        horaFin: aHora(r.fin)
      })) : (stryCov_9fa48("189", "190"), this.reservas.filter(stryMutAct_9fa48("191") ? () => undefined : (stryCov_9fa48("191"), r => stryMutAct_9fa48("194") ? r.estado === 'ACTIVA' && r.recurso === recurso || r.fecha === fecha : stryMutAct_9fa48("193") ? false : stryMutAct_9fa48("192") ? true : (stryCov_9fa48("192", "193", "194"), (stryMutAct_9fa48("196") ? r.estado === 'ACTIVA' || r.recurso === recurso : stryMutAct_9fa48("195") ? true : (stryCov_9fa48("195", "196"), (stryMutAct_9fa48("198") ? r.estado !== 'ACTIVA' : stryMutAct_9fa48("197") ? true : (stryCov_9fa48("197", "198"), r.estado === (stryMutAct_9fa48("199") ? "" : (stryCov_9fa48("199"), 'ACTIVA')))) && (stryMutAct_9fa48("201") ? r.recurso !== recurso : stryMutAct_9fa48("200") ? true : (stryCov_9fa48("200", "201"), r.recurso === recurso)))) && (stryMutAct_9fa48("203") ? r.fecha !== fecha : stryMutAct_9fa48("202") ? true : (stryCov_9fa48("202", "203"), r.fecha === fecha))))).sort(stryMutAct_9fa48("204") ? () => undefined : (stryCov_9fa48("204"), (a, b) => stryMutAct_9fa48("205") ? a.inicio + b.inicio : (stryCov_9fa48("205"), a.inicio - b.inicio))).map(stryMutAct_9fa48("206") ? () => undefined : (stryCov_9fa48("206"), r => stryMutAct_9fa48("207") ? {} : (stryCov_9fa48("207"), {
        ...r,
        horaInicio: aHora(r.inicio),
        horaFin: aHora(r.fin)
      }))));
    }
  }
}