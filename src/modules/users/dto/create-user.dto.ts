import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @Validate(PasswordConfirmValidator, ['password'])
  // password_confirmation: string;
}
