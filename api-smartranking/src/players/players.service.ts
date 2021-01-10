import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlayerDTO } from "./dtos/create-player.dto";
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Player } from "./interfaces/player.interface";

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<Player>
  ) {}

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;
    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(`E-mail informed (${email}) already in use`);
    }

    const playerCreated = new this.playerModel(createPlayerDTO);
    return playerCreated.save();
  }

  async updatePlayer(_id: string, updatePlayerDTO: UpdatePlayerDTO): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with _id ${_id} not found.`);
    }

    return this.playerModel.findOneAndUpdate({ _id }, 
      {
        $set: updatePlayerDTO,
      }).exec();
  }

  async getPlayerById(_id: string): Promise<Player> {
    return this.playerModel.findOne({ _id }).exec();
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  async deletePlayer(_id: string): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with _id ${_id} not found.`);
    }

    return this.playerModel.deleteOne({ _id }).exec();;
  }
}
