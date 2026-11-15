import { expect, test } from '@playwright/test';

function fechaFutura() {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 1);
  const fechaLocal = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60_000);
  return fechaLocal.toISOString().slice(0, 10);
}

async function registrarReserva(page, { fecha, horaInicio, duracion = 60, responsable = 'Ana' }) {
  await page.getByLabel('Fecha').fill(fecha);
  await page.getByLabel('Hora de inicio').fill(horaInicio);
  await page.getByLabel('Duración (min)').selectOption(String(duracion));
  await page.getByLabel('Responsable').fill(responsable);
  await page.getByRole('button', { name: 'Registrar' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/public/index.html');
});

test('muestra una reserva válida en la agenda', async ({ page }) => {
  const fecha = fechaFutura();

  await registrarReserva(page, { fecha, horaInicio: '10:00' });

  await expect(page.getByRole('status')).toContainText('registrada');
  const reserva = page.getByRole('row').filter({ hasText: 'Ana' });
  await expect(reserva).toContainText('Sala A');
  await expect(reserva).toContainText(fecha);
  await expect(reserva).toContainText('10:00-11:00');
});

test('rechaza RN-05 para una reserva de 60 minutos a las 19:30', async ({ page }) => {
  await registrarReserva(page, { fecha: fechaFutura(), horaInicio: '19:30' });

  await expect(page.getByRole('status')).toContainText('RN-05');
  await expect(page.getByRole('row').filter({ hasText: 'Ana' })).toHaveCount(0);
});

test('rechaza RN-07 cuando una reserva se traslapa', async ({ page }) => {
  const fecha = fechaFutura();
  await registrarReserva(page, { fecha, horaInicio: '10:00' });
  await expect(page.getByRole('status')).toContainText('registrada');

  await registrarReserva(page, { fecha, horaInicio: '10:30', responsable: 'Beatriz' });

  await expect(page.getByRole('status')).toContainText('RN-07');
  const reserva = page.getByRole('row').filter({ hasText: 'Ana' });
  await expect(reserva).toContainText('10:00-11:00');
  await expect(page.getByRole('row').filter({ hasText: 'Beatriz' })).toHaveCount(0);
});

test('cancelar una reserva libera el horario para registrarlo de nuevo (FA-02)', async ({ page }) => {
  const fecha = fechaFutura();
  await registrarReserva(page, { fecha, horaInicio: '10:00' });

  const reserva = page.getByRole('row').filter({ hasText: 'Ana' });
  await reserva.getByRole('button', { name: 'Cancelar' }).click();

  await expect(page.getByRole('status')).toContainText('cancelada');
  await expect(reserva).toHaveCount(0);

  await registrarReserva(page, { fecha, horaInicio: '10:00', responsable: 'Beatriz' });

  await expect(page.getByRole('status')).toContainText('registrada');
  const nuevaReserva = page.getByRole('row').filter({ hasText: 'Beatriz' });
  await expect(nuevaReserva).toContainText('10:00-11:00');
});
