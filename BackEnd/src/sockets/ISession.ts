import { IPlayer } from './IPlayer';

export interface ISession {
  id: string;
  players: IPlayer[];
}
