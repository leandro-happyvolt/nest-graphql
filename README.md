Observaciones: 
 - GraphQL si bien puede traer ResolveField, en temas de rendimiento esta haciendo una query por cada Post para traer el Author.
 - Además, cuando le específicamos que solamente queremos que nos traiga el nombre
 del Author y no el id, el servicio trae aún así todos los datos del Author, es decir, no es que la query de GraphQL que realiza el cliente modifica la query a la consulta hacía la base de datos que hace el Backend.
