import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { Player } from "./interfaces/player.interface";
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

  constructor (
    private readonly playersService: PlayersService
  ){}
  
  @Post()
  async  createOrUpdatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO
  ) {
    this.playersService.createOrUpdatePlayer(createPlayerDTO);
  }

  @Get()
  async getPlayer(
    @Query('email') email: string
  ): Promise<Player[] | Player> {
    if (email) {
      return this.playersService.getPlayerByEmail(email);
    }

    return this.playersService.getAllPlayers();
  }

  @Delete()
  async deletePlayer(
    @Query('email') email: string
  ): Promise<void> {
    this.playersService.deletePlayer(email);
  }
}
