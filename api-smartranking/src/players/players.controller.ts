import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player.dto';
import { UpdatePlayerDTO } from './dtos/update-player.dto';
import { Player } from "./interfaces/player.interface";
import { PlayersService } from './players.service';
import { PlayersValidationParams } from './pipes/players-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor (
    private readonly playersService: PlayersService
  ){}
  
  @Post()
  @UsePipes(ValidationPipe)
  async  createPlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    return this.playersService.createPlayer(createPlayerDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async  updatePlayer(
    @Body() updatePlayerDTO: UpdatePlayerDTO,
    @Param('_id', PlayersValidationParams) _id: string, 
  ): Promise<Player> {
    return this.playersService.updatePlayer(_id, updatePlayerDTO);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', PlayersValidationParams) _id: string
  ): Promise<Player> {
    return this.playersService.getPlayerById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParams) _id: string
  ): Promise<void> {
    return this.playersService.deletePlayer(_id);
  }
}
