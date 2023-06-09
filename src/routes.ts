import {Router,Request,Response} from "express";
import { CreateUserController } from "./Controllers/user/CreateUserController";
import { AuthUserController } from "./Controllers/user/AuthUserControlle";
const router = Router();
//Rotas USER ------------
router.post('/userinsert',new CreateUserController().handle);
router.post('/login',new AuthUserController().handle);
export { router };

/*Rotas
localhost:3333/login -- mostra usuario atraves do email e senha
localhost:3333/userinsert/ -- colocar usuario name , email e password
*/


