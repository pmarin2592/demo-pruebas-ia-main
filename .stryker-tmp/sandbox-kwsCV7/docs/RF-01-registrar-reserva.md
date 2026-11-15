# RF-01 — Registrar reserva de un recurso

> Requerimiento genérico usado para la demostración. Aplica a cualquier sistema del curso que asigne un recurso limitado en un horario: mesas de un restaurante, salas, citas, espacios de un evento, equipos, etc.

## Caso de uso CU-01: Registrar reserva

| Elemento | Descripción |
|---|---|
| Actor principal | Usuario operador (recepcionista, administrador, cliente) |
| Precondición | Existe al menos un recurso registrado con su capacidad máxima |
| Disparador | El actor solicita reservar un recurso para una fecha y hora |
| Postcondición (éxito) | La reserva queda registrada en estado `ACTIVA` y se muestra en la agenda del recurso |
| Postcondición (fallo) | No se registra nada y el sistema indica la regla incumplida |

### Flujo básico

1. El actor indica recurso, fecha, hora de inicio, duración, cantidad de personas y responsable.
2. El sistema valida las reglas de negocio RN-01 a RN-07.
3. El sistema registra la reserva, le asigna un identificador y la muestra en la agenda.

### Flujos alternos

- **FA-01** Si alguna regla no se cumple, el sistema rechaza la solicitud e indica el código y el motivo.
- **FA-02** El actor cancela una reserva activa; el espacio queda disponible de nuevo.

## Reglas de negocio

| Código | Regla |
|---|---|
| RN-01 | Recurso, fecha, hora de inicio, duración, personas y responsable son obligatorios. |
| RN-02 | El recurso debe existir en el catálogo. |
| RN-03 | No se puede reservar una fecha y hora que ya pasó. |
| RN-04 | La duración solo puede ser 30, 60, 90 o 120 minutos. |
| RN-05 | La reserva debe **iniciar a partir de las 08:00 y terminar a más tardar a las 20:00**. |
| RN-06 | La cantidad de personas debe estar entre 1 y la capacidad del recurso. |
| RN-07 | No puede traslaparse con otra reserva activa del mismo recurso. Reservas contiguas (una termina 10:00 y otra inicia 10:00) sí se permiten. |
