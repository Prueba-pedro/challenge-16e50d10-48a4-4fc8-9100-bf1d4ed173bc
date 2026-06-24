# Diseño y construcción de una API REST en el dominio de banca

La institución financiera 'FinBank' necesita una API REST para gestionar las solicitudes de préstamos de sus clientes. La API debe recibir solicitudes desde tres canales distintos (web, móvil, sucursales), validar los datos de entrada, persistir las solicitudes en una base de datos y emitir eventos de auditoría por cada aceptación. Los préstamos tienen un monto mínimo de 10 000 y máximo de 500 000, con un plazo de 12 a 60 meses. La API debe garantizar la idempotencia de las solicitudes por número de operación y canal, manejar la consistencia ante posibles fallos del sistema de auditoría y asegurar una latencia máxima de 200ms en el 95% de las solicitudes.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Node.js Express |
| **Nivel** | junior-l1 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Canal de entrada operativo

**Objetivo:** Implementar un endpoint que acepte solicitudes de préstamo desde los tres canales y persista cada solicitud con idempotencia.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- La solicitud debe contener los campos 'monto', 'plazo', 'canal' y 'numeroOperacion'. Validar que el monto esté entre 10 000 y 500 000 y el plazo entre 12 y 60 meses. Persistir la solicitud en la base de datos y asegurar que dos invocaciones con la misma clave ('numeroOperacion' + 'canal') produzcan un solo registro y devuelvan la misma respuesta dentro de 24h.

**Entregable:** Endpoint funcional que acepta y persiste solicitudes con idempotencia.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo garantizar la unicidad de la solicitud usando la combinación de 'numeroOperacion' y 'canal'.
- Piensa en cómo manejar la persistencia de la solicitud para asegurar la idempotencia.

</details>

### Fase 2: Consolidación de canales

**Objetivo:** Consolidar los tres canales de entrada sin pérdida de solicitudes ante backpressure de uno de ellos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar un mecanismo que consolide las solicitudes de los tres canales en un único flujo, asegurando que no se pierdan solicitudes ante backpressure de uno de los canales. La latencia máxima permitida es de 200ms en el 95% de las solicitudes.

**Entregable:** Mecanismo de consolidación de canales que asegura la no pérdida de solicitudes y cumple con el umbral de latencia.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de colas o buffers para manejar la backpressure.
- Piensa en cómo medir y garantizar el umbral de latencia.

</details>

### Fase 3: Recuperación ante caídas

**Objetivo:** Implementar la recuperación automática ante caída del sistema de auditoría sin reprocesar solicitudes emitidas.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementar un mecanismo que permita la recuperación automática ante caída del sistema de auditoría, asegurando que las solicitudes ya emitidas no sean reprocesadas. Debes considerar los posibles modos de falla del sistema de auditoría y diseñar una estrategia de recuperación que minimice la pérdida de datos y garantice la consistencia.

**Entregable:** Mecanismo de recuperación automática que asegura la no reprocesamiento de solicitudes emitidas y minimiza la pérdida de datos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de flags o marcas para identificar las solicitudes ya emitidas.
- Piensa en cómo manejar los posibles modos de falla del sistema de auditoría.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una solicitud de préstamo y cuáles son sus componentes?
- **paraQueSirve**: ¿Para qué sirve el endpoint de solicitudes de préstamo en el contexto de FinBank?
- **comoSeUsa**: ¿Cómo se usa el endpoint para enviar una solicitud de préstamo desde los diferentes canales?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al enviar una solicitud de préstamo y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica el diseño de la API para garantizar la idempotencia y la recuperación ante caídas?

## Criterios de Evaluacion

- Implementar un endpoint que acepte y persista solicitudes con idempotencia.
- Consolidar los tres canales de entrada sin pérdida de solicitudes ante backpressure.
- Implementar la recuperación automática ante caída del sistema de auditoría sin reprocesar solicitudes emitidas.

---

*Reto generado automaticamente por Challenge Generator - Pragma*
