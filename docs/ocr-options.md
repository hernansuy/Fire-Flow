# Opciones de reconocimiento de facturas

## Objetivo

fire flow debe reconocer comprobantes sin perder el control del usuario: comercio, fecha, número, moneda, subtotal, impuestos, total y, cuando sea posible, líneas de productos. El resultado siempre debe pasar por una revisión antes de confirmarse.

## Opción mínima: un único HTML

La opción mínima es `fire-flow.html`:

- captura cámara, imagen o PDF;
- ejecuta OCR en el navegador cuando el motor está disponible;
- aplica reglas sencillas para sugerir comercio y total;
- permite corrección manual;
- guarda datos localmente;
- no necesita servidor ni instalación.

Es la opción que se debe conservar como fallback y demo portable. Su límite es que el OCR y la interpretación de facturas son menos precisos en documentos con tablas, diseños variables o fotografías difíciles.

## Alternativa A: PaddleOCR / PaddleOCR.js

### Idea

Usar PaddleOCR como motor de detección de texto, reconocimiento y estructura de documentos. La variante JavaScript permite investigar una integración que conserve el procesamiento en el navegador.

Repositorio de referencia: [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR).

### Flujo propuesto

```text
Imagen/PDF
  → preprocesado
  → detección de regiones y texto
  → posiciones de cada palabra
  → identificación de bloques
  → parser de factura
  → confianza por campo
  → revisión del usuario
```

### Ventajas

- Mejor información espacial que un OCR de texto plano.
- Más adecuado para tablas y facturas con varias columnas.
- Posibilidad de mantener el procesamiento local en el navegador.
- Mantiene una experiencia PWA sin backend propio, si el tamaño y rendimiento son aceptables.

### Costes y riesgos

- Modelos y carga inicial más pesados.
- Compatibilidad y rendimiento variables según el móvil.
- PDF complejo puede requerir renderizar primero cada página como imagen.
- La detección de campos sigue necesitando reglas propias o plantillas.

### Cuándo elegirla

Elegir PaddleOCR.js si la prioridad es seguir publicando en GitHub Pages y procesar todo localmente, aceptando una descarga inicial mayor.

## Alternativa B: invoice2data

### Idea

Usar [invoice2data](https://github.com/invoice-x/invoice2data) después de extraer el texto del PDF o de una imagen. El proyecto utiliza plantillas YAML o JSON por proveedor, expresiones regulares y palabras clave para producir datos estructurados.

### Flujo propuesto

```text
PDF/imagen
  → extracción de texto u OCR
  → selección de plantilla por palabras clave
  → regex y reglas del proveedor
  → JSON estructurado
  → revisión del usuario
```

### Ventajas

- Muy bueno para comercios que se repiten.
- Permite reglas específicas para `TOTAL`, fecha, número y moneda.
- Facilita guardar plantillas por negocio.
- Soporta PDF, JPEG y PNG y salidas estructuradas.

### Costes y riesgos

- Requiere Python; no funciona directamente dentro de un HTML portable.
- Para GitHub Pages necesitaría un servicio externo o un proceso local auxiliar.
- Las plantillas deben mantenerse cuando un proveedor cambia su diseño.
- No es la mejor primera opción para facturas desconocidas sin plantilla.

### Cuándo elegirla

Elegir invoice2data si la prioridad es precisión repetible en un conjunto conocido de comercios y se acepta añadir un backend local, una aplicación de escritorio o un servicio separado.

## Recomendación para fire flow

Mantener tres niveles y no romper la versión portable:

1. **Mínimo actual:** HTML portable, OCR, reglas simples y revisión manual.
2. **Siguiente paso recomendado:** PaddleOCR.js para mejorar lectura, posiciones y tablas sin abandonar GitHub Pages.
3. **Modo avanzado opcional:** proceso local Python con invoice2data y plantillas por comercio.

La app puede seleccionar el modo según el entorno:

```text
HTML portable → parser básico
PWA online/offline → PaddleOCR.js
Modo local avanzado → invoice2data + plantillas
```

## Contrato común de salida

Independientemente del motor, todos deben devolver el mismo objeto lógico:

```json
{
  "merchant": { "value": "OXXO", "confidence": 0.98 },
  "date": { "value": "2026-09-04", "confidence": 0.94 },
  "total": { "value": 139.20, "currency": "MXN", "confidence": 0.91 },
  "invoiceNumber": { "value": "A-12345", "confidence": 0.88 },
  "lines": [],
  "source": "paddleocr"
}
```

Los campos por debajo del umbral deben quedar resaltados y nunca confirmarse automáticamente.

## Decisión actual

Se conserva `fire-flow.html` como opción mínima y portable. La primera mejora inteligente será probar PaddleOCR.js con comprobantes reales. Si el rendimiento o el tamaño resultan excesivos, se documentará el salto a un modo local Python con invoice2data, sin eliminar la versión HTML.
