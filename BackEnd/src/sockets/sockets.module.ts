import { Module } from '@nestjs/common';
import { SocketService } from './sockets.service';

@Module({
  controllers: [],
  providers: [SocketService],
})
export class SocketsModule {}
