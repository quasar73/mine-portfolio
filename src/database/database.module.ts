import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.DB_CONN,
            synchronize: true,
            entities: ['dist/**/*.entity{.ts,.js}'],
        }),
    ],
})
export class DatabaseModule {}
