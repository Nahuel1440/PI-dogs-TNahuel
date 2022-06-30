# Individual Project - Dogs Page

<img height="200" src="./dog.png" />

## Objetivos del Proyecto

- Construir una App utlizando Reactjs, Redux, Nodejs y Sequelize.
- Afirmar y conectar los conceptos aprendidos en el bootcamp de soyHenry.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

Tecnologias usadas y sus respectivas versiones:

- __react__: 17.0.1
- __react-dom__: 17.0.1
- __react-router-dom__: 5.2.0
- __redux__: 4.0.5
- __react-redux__: 7.2.3
- __styled-components__: 5.3.5
- __express__: 4.17.1
- __sequelize__: 6.3.5
- __postgresql__: 14

El proyecto cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente. El contenido de `client` fue creado usando: Create React App.

__IMPORTANTE__: Si desea clonar el proyecto y luego ejecutarlo de forma local, asegurese de instalar los modulos requeridos en el package.json (Hacer un npm install en las carpetas /api y en /client es suficiente). En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:
```env
(Si se trabaja con una base de datos de forma local)
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
(Si se trabaja con una base de datos de forma remota)
URI=postgres://USER:PASSWORD@HOST:PORT/DATABASE

```
Para poder utilizar la API externa [the dog api](https://thedogapi.com/) es necesario crearse una cuenta para obtener una API Key que luego debe ser incluida en todos los request que se realizan, simplemente se resuelve agregando la clave en el archivo `.env` de la siguiente forma: YOUR_API_KEY=<KEY obtenida>  

## Enunciado

La idea general fue crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

- Buscar razas de perros
- Filtrarlas / Ordenarlas
- Agregar nuevas razas.

### Endpoint utilizado

- GET <https://api.thedogapi.com/v1/breeds>

## Requerimientos

### Frontend
Nota: El diseño general de la página es completamente responsive! Así que no tendrán problemas en verla a traves de sus móviles :)
 
Se desarrolló una aplicación con React/Redux que contiene las siguientes pantallas/rutas: 

__Home__: Una landing page que contiene:

- [x] Menú desplegable, con el cual se puede acceder a las demas rutas.
- [x] Mensaje de bienvenida a la página.
- [x] Botones para navegar entre las distintas secciones de la landing page.
- [x] 2 secciones que poseen una introducción de las rutas de la app, con botones para acceder a ellas.

__Search__: Ruta para la busqueda de razas, contiene:

- [x] Input de búsqueda para encontrar razas de perros por nombre.
- [x] Área donde se puede observar el listado de razas de perros. Deberá mostrar su:
  - Imagen
  - Nombre
  - Temperamento
  - Peso
- [x] Botones/Opciones para filtrar por:
  - Temperamentos. Se puede filtrar las razas de perros por uno o varios temperamentos.
  - Razas existentes (es decir las que vienen de la API), no existentes (creadas mediante el form), o todas las razas.
- [x] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  - Orden alfabético
  - Peso
- [x] Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

__Ruta de detalle de raza de perro__: Contiene

- [x] Carta con los detalles de la raza (imagen, nombre, temperamento, altura, peso y años de vida).
- [x] Botón para volver hacia atras.

__Ruta de creación de raza de perro__: Contiene

- [x] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre*
  - Altura* (Se diferencia entre altura mínima y máxima)
  - Peso* (Se diferencia entre peso mínimo y máximo)
  - Años de vida (Se diferencia entre peso mínimo y máximo. Además también se admite solo ingresar el año de vida minimo)
  - Imagen (Solo se admite agregar la url de alguna imagen. Debe poseer el siguiente formato https://example.com)
- [x] Posibilidad de seleccionar/agregar uno o más temperamentos
- [x] Botón/Opción para crear una nueva raza de perro

### Base de datos

El modelo de la base de datos poseé las siguientes entidades (Aquellas propiedades marcadas con asterísco son requeridas):

- [x] Raza con las siguientes propiedades:
  - ID *
  - Nombre *
  - Altura *
  - Peso *
  - Años de vida
  - imagen(URL)
- [x] Temperamento con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades debe ser de muchos a muchos ya que una raza de perro puede tener varios "temperamentos" en simultaneo y, a su vez, un "temperamento" puede corresponder a múltiples razas de perro distintas. Por ejemplo la raza `pug` es docil, inteligente y sociable (entre otras). Pero a su vez existen otras razas de perro que también son sociables o inteligentes.

### Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [x] __GET /dogs__:
  - Obtiene un listado de todas las razas de perros.
  - Devuelve solo los datos necesarios para la ruta principal.
- [x] __GET /dogs?name="..."__:
  - Obtiene un listado de las razas de perro que contengan la palabra ingresada como query parameter
  - Si no existe ninguna raza de perro muestra un mensaje indicándolo.
- [x] __GET /dogs/{idRaza}__:
  - Obtiene el detalle de una raza de perro en particular.
  - Trae solo los datos necesarios para la ruta de detalles del perro indicado.
  - Incluye los temperamentos asociados.
- [x] __POST /dogs__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body.
  - Crea una raza de perro en la base de datos relacionada con los temperamentos indicados.
- [x] __GET /temperaments__:
  - Obtiene todos los temperamentos posibles.
  - En una primera instancia son obtenidos desde la API externa y guardados en la base de datos, y luego son utilizados desde ahi.

Nota: Los perros obtenidos desde la api no son almacenados en la base de datos, solo se los llama y muestra. 

### Testing

- [x] Modelos con sus test respectivos.
- [x] Rutas con sus test respectivos.
- [ ] Componentes de react con sus test respectivos. (En proceso)
