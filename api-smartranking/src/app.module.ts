import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/../.env`,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION_STRING, 
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        autoIndex: false,
        serverSelectionTimeoutMS: 10 * 1000, // 10 s
      }
    ),
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
