import { IsNotEmpty, IsString } from 'class-validator';
export class GetSignedUrlDTO {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  contentType: string;
}
