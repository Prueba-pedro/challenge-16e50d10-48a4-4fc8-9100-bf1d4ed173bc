# Prompt para Mejorar el Codigo Base

Copia y pega el siguiente contenido completo en un asistente de IA (Claude, ChatGPT, etc.)
para obtener un ZIP con el proyecto corregido y listo para compilar.

---

```
Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación o descripciones sin código, genera los archivos
correspondientes sin aplicar análisis de compilación
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:
// === ARCHIVO: package.json ===
{
  "name": "finbank-loan-api",
  "version": "1.0.0",
  "description": "API REST para gestionar solicitudes de préstamos en FinBank.",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "4.18.2",
    "mongoose": "6.3.4"
  },
  "devDependencies": {
    "jest": "27.5.1"
  }
}

// === ARCHIVO: src/app.js ===
const express = require('express');
const loanRequestRoutes = require('./routes/loanRequestRoutes');

const app = express();
app.use(express.json());
app.use('/api/loans', loanRequestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// === ARCHIVO: src/config/database.js ===
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/finbank', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

// === ARCHIVO: src/models/loanRequest.js ===
const mongoose = require('mongoose');

const loanRequestSchema = new mongoose.Schema({
  monto: { type: Number, required: true },
  plazo: { type: Number, required: true },
  canal: { type: String, required: true },
  numeroOperacion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanRequest', loanRequestSchema);

// === ARCHIVO: src/controllers/loanRequestController.js ===
const LoanRequest = require('../models/loanRequest');
const auditEvent = require('../utils/auditEvent');

const createLoanRequest = async (req, res) => {
  try {
    const loanRequest = new LoanRequest(req.body);
    await loanRequest.save();
    auditEvent.emit('loanRequestCreated', loanRequest);
    res.status(201).json(loanRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createLoanRequest };

// === ARCHIVO: src/routes/loanRequestRoutes.js ===
const express = require('express');
const router = express.Router();
const { createLoanRequest } = require('../controllers/loanRequestController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const idempotencyMiddleware = require('../middlewares/idempotencyMiddleware');

router.post('/requests', validationMiddleware, idempotencyMiddleware, createLoanRequest);

module.exports = router;

// === ARCHIVO: src/services/loanRequestService.js ===
const LoanRequest = require('../models/loanRequest');

const saveLoanRequest = async (loanRequestData) => {
  const loanRequest = new LoanRequest(loanRequestData);
  await loanRequest.save();
  return loanRequest;
};

module.exports = { saveLoanRequest };

// === ARCHIVO: src/middlewares/validationMiddleware.js ===
const { check, validationResult } = require('express-validator');

const validationMiddleware = [
  check('monto').isFloat({ min: 10000, max: 500000 }).withMessage('Monto debe estar entre 10,000 y 500,000'),
  check('plazo').isInt({ min: 12, max: 60 }).withMessage('Plazo debe estar entre 12 y 60 meses'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validationMiddleware;

// === ARCHIVO: src/middlewares/idempotencyMiddleware.js ===
const LoanRequest = require('../models/loanRequest');

const idempotencyMiddleware = async (req, res, next) => {
  const { numeroOperacion, canal } = req.body;
  const existingRequest = await LoanRequest.findOne({ numeroOperacion, canal });
  if (existingRequest) {
    return res.status(200).json(existingRequest);
  }
  next();
};

module.exports = idempotencyMiddleware;

// === ARCHIVO: src/utils/auditEvent.js ===
const EventEmitter = require('events');

class AuditEvent extends EventEmitter {}

const auditEvent = new AuditEvent();

module.exports = auditEvent;

// === ARCHIVO: test/loanRequestController.test.js ===
const request = require('supertest');
const app = require('../../src/app');
const LoanRequest = require('../../src/models/loanRequest');

describe('Loan Request Controller', () => {
  afterEach(async () => {
    await LoanRequest.deleteMany({});
  });

  it('should create a new loan request', async () => {
    const res = await request(app)
     .post('/api/loans/requests')
     .send({
        monto: 20000,
        plazo: 24,
        canal: 'web',
        numeroOperacion: '12345'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });
});
```
