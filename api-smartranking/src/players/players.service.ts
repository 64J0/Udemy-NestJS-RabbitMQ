import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from "./dtos/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;
    const playerFound = this.players.find(p => p.email === email);

    if (playerFound) {
      return this.update(playerFound, createPlayerDTO);
    }

    return this.create(createPlayerDTO);
  }

  async getPlayer(email: string): Promise<Player> {
    return this.players.find(p => p.email === email);
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async deletePlayer(email: string): Promise<void> {
    this.delete(email);
  }
  
  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, email, phoneNumber } = createPlayerDTO;
    const player: Player = {
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      positionRanking: 15,
      urlPhotoPlayer: 'https://www.google.com.br'
    };

    this.logger.log(`createPlayerDTO: ${JSON.stringify(player)}`);
    this.players.push(player);
  }

  private update(
    playerFound: Player, 
    createPlayerDTO: CreatePlayerDTO
  ): void {
    const { name } = createPlayerDTO;
    playerFound.name = name;
  }

  private delete(email: string): void {
    this.players = this.players.filter(p => p.email !== email);
  }

}
