import { Controller, Get, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @UseGuards(JwtGuard, new RolesGuard('admin'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.remove(+id);
    return { message: 'User deleted successfully' };
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
