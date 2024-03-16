import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
//
@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES_REPOSITORY')
    private rolesRepository,
  ) {}

  async createRole(dto: CreateRoleDto) {
    if (!!dto.value && !!dto.description) {
      return await this.rolesRepository.create(dto);
    } else {
      throw new BadRequestException('Укажите значение и(или) описание роли');
    }
  }

  async getRoleByValue(nameRole: string) {
    if (!!nameRole) {
      return await this.rolesRepository.findOne({ where: { value: nameRole } });
    } else {
      throw new BadRequestException('Укажите значение роли!');
    }
  }
}
