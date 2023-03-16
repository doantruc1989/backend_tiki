import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchUsersDto } from './dto/searchUsers.dto';
import { updateUserPwDto } from './dto/updateUserPw.dto';
import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { CreateNewPwdDto } from './dto/createNewPwd.dto';
import { Role } from './entity/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Roles(Role.User)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get()
  findAll(@Query('page') page: number) {
    return this.usersService.findAll(page);
  }

  @Get('/search')
  querySearch(@Query() searchUsersDto: SearchUsersDto) {
    return this.usersService.querySearchUsers(searchUsersDto);
  }

  // @Roles(Role.Admin)
  // @UseGuards(JwtGuard, RolesGuard)
  @Get('/total')
  getcountUser() {
    return this.usersService.getCountUser();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateuser(id, updateUserDto);
  }

  @Patch('profile/:id')
  updatePw(@Param('id') id: number, @Body() updateUserPwDto: updateUserPwDto) {
    return this.usersService.updatePW(id, updateUserPwDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Post('forgot-password')
  async sendEmailForgotPassword(@Body() forgetPwdDto: ForgetPwdDto) {
    return this.usersService.sendEmailForgotPassword(forgetPwdDto);
  }

  @Post('newpassword')
  async createNewPassword(@Body() createNewPwdDto: CreateNewPwdDto) {
    return this.usersService.createNewPwd(createNewPwdDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/file',
        filename: (req, file, callback) => {
          const uniqeSuffix = Date.now();
          //  + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.substring(
            0,
            file.originalname.length - 4,
          )}-${uniqeSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return 'file uploaded';
  }

  // @Post('uploadmulti')
  // @UseInterceptors(FilesInterceptor('files'))
  // uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
  //   console.log(files);
  // }
}
