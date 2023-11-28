import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistrationDto } from './registation.dto';
import { Response } from 'express';
import { User } from './user';

const users: User[] = [new User('admin@eyample.com','asdf1234',23)];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('register')
  @Render('registerform')
  registerform(){
    return { errors: [] };
  }

  @Post('register')
  @Render('registerform')
  register(@Body() registration: RegistrationDto, @Res() res: Response ){
    const errors: string[] =[];
    if(!registration.email.includes('@')){
      errors.push('Az email nem megfelelő');
    }
    if(registration.password.length<8){
      errors.push('A jelszó legalább 8 karakter');
    }
    if(registration.password !==registration.password_again){
      errors.push('A két jelszónak meg kell egyeznie');
    }
    const age = parseInt(registration.age);
    if(errors.length>0){
      res.render('registerform',{
        errors,
      });
    }
    else{
      users.push(new User(registration.email,registration.password, age));
      console.log(users);
      res.redirect('/');
    }
  }

  @Post('login')
  login(){
      return 'You are logged';
  }
}
