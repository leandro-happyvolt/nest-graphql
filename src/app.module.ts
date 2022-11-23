// * CONTROLLERS
import { AppController } from './app.controller';
// * SERVICES
import { AppService } from './app.service';
// * MODULES
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
// * GRAPHQL
import { GraphQLModule } from '@nestjs/graphql';
// el ApolloDriverConfig es para extender la configuracion de GraphQLModule.forRoot()
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// * TYPEORM
import { TypeOrmModule } from '@nestjs/typeorm';

// * DEPENDENCIES
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    // dice que el módulo de GraphQL debe ir antes del módulo de Posts
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // Le pasamos un driver, para decirle que módulo de conexión voy a usar
      driver: ApolloDriver,
      // También debemos específicarle donde van a estar las interfaces por así decirlo o el lenguaje de GraphQL.
      // Es decir, GraphQL necesita un Schema para poder saber que es lo que tiene que consultar, que datos va a recibir, que datos puede aceptar para poder crear datos, etc.
      // En la documentación de NestJS con GraphQL nos va hablar de los dos enfoques para trabajar con GraphQL, el primero es el enfoque de Code First y el segundo es el Schema First.
      // El enfoque de code quiere decir que si nosotros escribimos clases de TS, estos se van a transformar en schemas de GraphQL.
      // El otro enfoque sería escribir el schema de GraphQL y que a partir de ahí se genera el código de TS.
      // Si en nuestro caso ya estamos usando TS, junto con un ORM como TypeORM, entonces lo mejor es usar el enfoque de Code First.
      // Ya que simplemente defines el tipo User y se auto-genera el schema de GraphQL como el modelado en la DB.
      // Nosotros queremos que nos autogenere ese Schema dentro de esta carpeta src
      // Donde process.cwd() es la ruta del current working directory (cwd) es decir /desktop/graphql/nest-graphqlo-tutorial
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    // Este también tiene que ir antes de nuestros módulos
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      // Con esto le digo que todos los archivos de este directorio src y que contenga.entity.ts o .js, se va a transformar en tablas de la DB
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // Esto es para que si la tabla/entidad no existe, lo va a crear. Esto es desarrollo es super útil
      synchronize: true,
    }),
    // Si bien para el PostsModule tuvimos que crear nuestra entidad, luego nuestro servicio, luego nuestro resolver, luego nuestro dto, etc.
    // Nest.JS ya nos da un comando para evitar este boilerPlate y generarlo todo de una vez.
    PostsModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
