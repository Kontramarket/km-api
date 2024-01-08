import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TenderGroupModule } from './tender-group/tender-group.module';
import { TenderAttributeModule } from './tender-attribute/tender-attribute.module';
import { TenderModule } from './tender/tender.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserGroupModule } from './user-group/user-group.module';
import { UserAttributeModule } from './user-attribute/user-attribute.module';
//import { LoggerModule } from './logger/logger.module';
import { KanbanModule } from './kanban/kanban.module';
import { NewsModule } from './news/news.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailServiceModule } from './mail-service/mail-service.module';
import { ChatServiceModule } from './chat-service/chat-service.module';

//Mongo nikolarakic M8ZuWxaErw6DZdws
//no-reply@kontramarket.com 1Y,z~0jTTe=B

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://no-reply@kontramarket.com:1Y,z~0jTTe=B@mail.kontramarket.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/pug-templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    MongooseModule.forRoot(
      //database url string
      'mongodb+srv://nikolarakic:M8ZuWxaErw6DZdws@beta.jnvhomc.mongodb.net/Kontramarket?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    AdminModule,
    TenderGroupModule,
    TenderAttributeModule,
    TenderModule,
    UserGroupModule,
    UserAttributeModule,
    // LoggerModule,
    KanbanModule,
    NewsModule,
    FileManagerModule,
    MailServiceModule,
    ChatServiceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
