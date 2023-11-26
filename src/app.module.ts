import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { StandardUserModule } from './standard-user/standard-user.module';
import { CompanyUserModule } from './company-user/company-user.module';
import { SupportUserModule } from './support-user/support-user.module';

//Mongo nikolarakic M8ZuWxaErw6DZdws

@Module({
  imports: [
    MongooseModule.forRoot(
      //database url string
      'mongodb+srv://nikolarakic:M8ZuWxaErw6DZdws@beta.jnvhomc.mongodb.net/Kontramarket?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    AdminModule,
    StandardUserModule,
    CompanyUserModule,
    SupportUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
