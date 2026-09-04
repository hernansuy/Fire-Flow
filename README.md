# fire flow

`fire flow` es una aplicación web local-first para registrar y organizar gastos personales a partir de tickets, facturas y comprobantes.

La idea central es sencilla: crear un mes, capturar un comprobante desde la cámara o subir un archivo, revisar los datos detectados y mantener un registro editable que pueda exportarse a Excel.

## Introducción

fire flow está pensada para personas que necesitan llevar una contabilidad personal sin depender de una cuenta, una base de datos remota o una sincronización en la nube. Los gastos se organizan por meses y cada registro recibe un identificador como `2026-09-001`. Ese mismo identificador se utiliza para relacionar el gasto con su imagen, PDF o ticket original.

La aplicación trabaja con monedas de México y Sudamérica, permite editar el tipo de cambio y calcula el equivalente en dólares. La exportación mensual genera un archivo compatible con Excel con resumen, gastos, importes originales, moneda, conversión, estado y comprobante asociado.

## Características

- Creación y selección de meses antes de registrar gastos.
- Captura rápida desde cámara o subida de imágenes y PDF.
- OCR local en el navegador para ayudar a identificar comercio y total.
- Bandeja de revisión antes de confirmar un gasto.
- Persistencia local en el navegador.
- Identificadores consecutivos por mes.
- Monedas: USD, MXN, COP, ARS, UYU, BRL, CLP, PEN, BOB, PYG y VES.
- Tipo de cambio editable y conversión a USD.
- Exportación mensual a Excel `.xls` formateado.
- Versión portable en un único archivo HTML.

## Uso

### Versión portable

Abre [fire-flow.html](./fire-flow.html) directamente en el navegador. Esta versión contiene la interfaz, estilos y lógica en un único archivo, por lo que es adecuada para compartirla completa.

### Versión PWA

Sirve el proyecto desde un servidor estático para utilizar la versión PWA:

```bash
python -m http.server 4173
```

Después abre `http://localhost:4173`.

## Privacidad

Los datos de la aplicación se guardan localmente. No se incluye autenticación ni sincronización cloud. El OCR se ejecuta en el navegador; el motor OCR de la versión actual se carga desde CDN cuando está disponible.

## Estado del proyecto

Esta es una primera versión funcional enfocada en captura, revisión, organización mensual y exportación. Las siguientes mejoras naturales son empaquetar el motor OCR localmente, añadir edición completa de registros y generar un `.xlsx` nativo.
