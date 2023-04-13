import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsGateway } from './sockets/sockets.gateway';
import { SocketService } from './sockets/sockets.service';
import { SocketsModule } from './sockets/sockets.module';

@Module({
  imports: [SocketsModule],
  controllers: [AppController],
  providers: [AppService, SocketsGateway, SocketService],
})
export class AppModule {}
