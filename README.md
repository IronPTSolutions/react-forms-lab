# React Forms Lab

En este lab vamos a reforzar tanto la validación de formularios cómo la comunicación entre componentes padre <> hijo.


# Iteración 1

En esta parte nos centraremos en el formulario de creación de eventos, un evento tiene la siguiente información:

| Nombre      | Tipo     | Descripción                 | Validaciones                                   |
|-------------|----------|-----------------------------|------------------------------------------------|
| title       | string   | Nombre del evento           | - Requerido                                    |
| date        | string   | Fecha del evento (sin hora) | - Requerido - Fecha válida                     |
| poster      | string   | Imágen del evento           | - Requerido - Opcional: que sea una URL válida |

Trabajaremos en el componente `./src/components/events/event-form.js`:
  - useState (event, errros, touch)
  - handleChange
  - handleBlur
  - handleSubmit
  - isValid
  - onCreatedEvent

Una vez se hace submit del formulário tenemos que emitir un evento `onCreatedEvent` que envíe el evento al componente padre, deberá añadir un campo `id` al evento antes de enviarlo,
usad la siguiente [librería](https://www.npmjs.com/package/uuid) para generar uuids.

> Acordaros de no intentar hacer toooodos los inputs a la vez, primero uno, con todo controlado y el resto saldrán solos 😎

# Iteración 2

Listaremos los eventos creados a partir del formulario, incilamente centraremos en conseguir que se vean simplemente los títulos de los eventos.

Trabajaremos en los componentes :
- `./src/components/events/event-form.js`: 
  - onEventCreated
- `./src/components/events/event-list.js`: 
  - handleEventCreated
  - useState
- `./src/components/events/event-item.js`: 
  - Simplemente renderizar el título del evento


# Iteración 3

Maquetación de la tarjeta del evento, podéis mirar en la demo como debe quedar, pero no inspeccionéis el HTML, perderá la gracia =D.


# Iteración 4

- Añadir un botón de borrado de evento: `onDeletedEvent`
- Añadir un botón de me gusta al evento (efecto toogle): `onLikedEvent`
