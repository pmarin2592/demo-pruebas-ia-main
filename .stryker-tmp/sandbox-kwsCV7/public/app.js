// @ts-nocheck
import { Agenda, ErrorValidacion } from '../src/reservas.js';

const agenda = new Agenda({ 'Sala A': 10, 'Mesa 1': 4 });
const form = document.getElementById('form-reserva');
const mensaje = document.getElementById('mensaje');
const lista = document.getElementById('lista');

function mostrar(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = tipo;
}

function pintarAgenda() {
  const filas = agenda.reservas
    .filter((r) => r.estado === 'ACTIVA')
    .flatMap((r) => agenda.listar(r.recurso, r.fecha).filter((x) => x.id === r.id));
  lista.innerHTML = '';
  for (const r of filas) {
    const tr = document.createElement('tr');
    tr.dataset.id = r.id;
    for (const valor of [r.id, r.recurso, r.fecha, `${r.horaInicio}-${r.horaFin}`, r.personas, r.responsable]) {
      const td = document.createElement('td');
      td.textContent = valor;
      tr.appendChild(td);
    }
    const td = document.createElement('td');
    const btn = document.createElement('button');
    btn.textContent = 'Cancelar';
    btn.addEventListener('click', () => {
      agenda.cancelar(r.id);
      mostrar(`Reserva #${r.id} cancelada`, 'ok');
      pintarAgenda();
    });
    td.appendChild(btn);
    tr.appendChild(td);
    lista.appendChild(tr);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(form);
  try {
    const r = agenda.registrar({
      recurso: datos.get('recurso'),
      fecha: datos.get('fecha'),
      horaInicio: datos.get('horaInicio'),
      duracion: Number(datos.get('duracion')),
      personas: Number(datos.get('personas')),
      responsable: datos.get('responsable'),
    });
    mostrar(`Reserva #${r.id} registrada: ${r.recurso} ${r.fecha} ${r.horaInicio}-${r.horaFin}`, 'ok');
    pintarAgenda();
  } catch (err) {
    if (err instanceof ErrorValidacion) mostrar(`${err.codigo}: ${err.message}`, 'error');
    else throw err;
  }
});
