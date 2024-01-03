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
import { LoggerModule } from './logger/logger.module';
import { KanbanModule } from './kanban/kanban.module';
import { NewsModule } from './news/news.module';

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
    TenderGroupModule,
    TenderAttributeModule,
    TenderModule,
    UserGroupModule,
    UserAttributeModule,
    // LoggerModule,
    KanbanModule,
    NewsModule,
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
