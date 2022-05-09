import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createWriteStream } from 'fs';
import { get } from 'https';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle('Mine Portfolio API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    const file = createWriteStream(process.env.GCS_KEYFILE);
    get(process.env.KEYFILE_URL, (response) => {
        response.pipe(file);
    });

    await app.listen(process.env.PORT || 3000);
}
bootstrap();
