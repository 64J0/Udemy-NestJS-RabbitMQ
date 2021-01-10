import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlayerDTO } from "./dtos/create-player.dto";
import { Player } from "./interfaces/player.interface";

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<Player>
  ) {}

  async createOrUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;
    const playerFound = await this.getPlayerByEmail(email);

    if (playerFound) {
      return this.update(createPlayerDTO);
    }

    return this.create(createPlayerDTO);
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    return this.playerModel.findOne({ email }).exec();
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async deletePlayer(email: string): Promise<void> {
    return this.playerModel.remove({ email }).exec();;
  }
  
  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDTO);
    return playerCreated.save();
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return this.playerModel.findOneAndUpdate({
      email: createPlayerDTO.email,
    }, {
      $set: createPlayerDTO,
    }).exec();
  }
}
