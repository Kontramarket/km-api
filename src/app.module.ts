import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

//Mongo nikolarakic M8ZuWxaErw6DZdws

@Module({
  imports: [
    MongooseModule.forRoot(
      //database url string
      'mongodb+srv://nikolarakic:M8ZuWxaErw6DZdws@beta.jnvhomc.mongodb.net/Kontramarket?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
