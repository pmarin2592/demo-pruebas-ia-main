# language: es
# Casos de prueba del RF-01, diseñados con apoyo de la IA a partir de
# docs/RF-01-registrar-reserva.md y revisados por el ingeniero (punto de control 1).
# Las líneas marcadas con [ING] las agregó o corrigió el ingeniero.

Característica: RF-01 Registrar reserva de un recurso
  Como usuario operador
  Quiero reservar un recurso en una fecha y hora
  Para asegurar su uso sin choques y dentro del horario de atención

  Antecedentes:
    Dado un catálogo con "Sala A" (capacidad 10) y "Mesa 1" (capacidad 4)
    Y la fecha y hora actual es "2030-01-01 08:00"

  Escenario: Reserva válida
    Cuando reservo "Sala A" el "2030-01-10" a las "10:00" por 60 minutos para 4 personas a nombre de "Ana"
    Entonces la reserva queda ACTIVA de "10:00" a "11:00"
    Y aparece en la agenda de "Sala A" para el "2030-01-10"

  Escenario: Faltan datos obligatorios (RN-01)
    Cuando intento reservar "Sala A" sin indicar el responsable
    Entonces el sistema rechaza con "RN-01"

  Escenario: Recurso inexistente (RN-02)
    Cuando reservo "Sala Z" el "2030-01-10" a las "10:00"
    Entonces el sistema rechaza con "RN-02"

  Escenario: Reserva en el pasado (RN-03)
    Cuando reservo "Sala A" el "2029-12-31" a las "10:00"
    Entonces el sistema rechaza con "RN-03"

  Esquema del escenario: Duraciones permitidas (RN-04)
    Cuando reservo "Sala A" el "2030-01-10" a las "10:00" por <duracion> minutos
    Entonces el resultado es "<resultado>"
    Ejemplos:
      | duracion | resultado  |
      | 30       | registrada |
      | 120      | registrada |
      # [ING] valores fuera de la lista permitida
      | 45       | RN-04      |
      | 150      | RN-04      |

  Esquema del escenario: Horario de atención (RN-05)
    Cuando reservo "Sala A" el "2030-01-10" a las "<inicio>" por <duracion> minutos
    Entonces el resultado es "<resultado>"
    Ejemplos:
      | inicio | duracion | resultado  |
      | 07:59  | 30       | RN-05      |
      | 08:00  | 30       | registrada |
      # [ING] bordes del cierre: la reserva debe TERMINAR a más tardar a las 20:00
      | 19:00  | 60       | registrada |
      | 19:30  | 60       | RN-05      |
      | 19:59  | 30       | RN-05      |

  Esquema del escenario: Capacidad del recurso (RN-06)
    Cuando reservo "Mesa 1" el "2030-01-10" a las "10:00" para <personas> personas
    Entonces el resultado es "<resultado>"
    Ejemplos:
      | personas | resultado  |
      | 1        | registrada |
      | 4        | registrada |
      # [ING] valores fuera del rango 1..capacidad
      | 0        | RN-06      |
      | 5        | RN-06      |

  Escenario: Traslape con otra reserva activa (RN-07)
    Dado una reserva activa de "Sala A" el "2030-01-10" de "10:00" a "11:00"
    Cuando reservo "Sala A" el mismo día de "10:30" a "11:30"
    Entonces el sistema rechaza con "RN-07"

  # [ING] borde de RN-07: las reservas contiguas sí se permiten
  Escenario: Reservas contiguas (RN-07)
    Dado una reserva activa de "Sala A" el "2030-01-10" de "10:00" a "11:00"
    Cuando reservo "Sala A" el mismo día de "11:00" a "12:00"
    Entonces la reserva queda registrada

  Escenario: Cancelar libera el espacio (FA-02)
    Dado una reserva activa de "Sala A" el "2030-01-10" de "10:00" a "11:00"
    Cuando la cancelo
    Y reservo de nuevo "Sala A" de "10:00" a "11:00"
    Entonces la nueva reserva queda registrada
