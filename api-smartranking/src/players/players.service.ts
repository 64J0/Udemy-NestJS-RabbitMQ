import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from "./dtos/create-player.dto";
import { Player } from "./interfaces/player.interface";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {

  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    this.create(createPlayerDTO);
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

}
