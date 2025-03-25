import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("CONTROL System`s Api")
    .setDescription(
      "Документация по действующему API системы диспетчерского контроля полицейского сообщества SA-SD.RU"
    )
    .setVersion("" + process.env.VERSION)
    .setContact(
      "Chief Developer | Gleb Rudenko",
      "https://telegram.com/enthonybtw",
      "queenqspades@gmail.com"
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, documentFactory);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
