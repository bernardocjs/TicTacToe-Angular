import { Server } from 'socket.io';

export function sendToPlayers(
  server: Server,
  event: string,
  payload: any,
  sessionId: string,
) {
  server.to(sessionId).emit(event, payload); // Actually send the message to the user device via WebSocket channel.
}
