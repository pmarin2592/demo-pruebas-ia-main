# Demo — Pruebas de software con IA

Repositorio del Trabajo de Investigación (Tema 4, *Pruebas de software con IA*), IF-6100.

Contiene un sistema pequeño y genérico, **registrar la reserva de un recurso en un horario** (mesas, salas, citas, espacios o equipos), sobre el que el grupo diseña, genera y ejecuta pruebas con apoyo de IA. Todo se integra por Pull Request y se valida en GitHub Actions.

## Estructura

| Ruta | Contenido |
|---|---|
| `docs/RF-01-registrar-reserva.md` | Caso de uso y reglas de negocio RN-01 a RN-07 |
| `src/reservas.js` | Lógica de dominio (sistema bajo prueba) |
| `public/` | Interfaz web mínima |
| `features/` | Casos de prueba en Gherkin (se agregan durante la demo) |
| `tests/unit/`, `tests/e2e/` | Pruebas automatizadas (las aporta el grupo) |
| `.github/workflows/ci.yml` | Pipeline CI/CD: unitarias + cobertura, mutación, E2E y despliegue a GitHub Pages |

## Ejecutar localmente (opcional)

Requiere Node.js 20 o superior.

```bash
npm ci
npm start              # interfaz en http://localhost:4173
npm test               # pruebas unitarias
npm run test:cov       # unitarias + cobertura (umbral: líneas 90 %, ramas 85 %)
npm run test:mutation  # pruebas de mutación (umbral 70 %)
npx playwright install chromium && npm run test:e2e
```

## Reglas del repositorio

- La demostración la desarrolla **Nubia Elena Brenes Valerín**; todo cambio entra a `main` por Pull Request.
- `main` está en rojo al inicio a propósito: todavía no hay pruebas y el pipeline exige cobertura.
- El documento, la presentación y la evidencia se entregan en el repositorio `pruebas-software-ia`.
