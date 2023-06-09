import { User } from "@prisma/client";
import prismaClient from "../../prisma";
interface AuthRequest {
    email: string;
    password: string;
    
}
interface LoginResult {
    success: boolean;
    message: string;
    user?: User;
}
class AuthUserService {
    async execute({ email, password }: AuthRequest):Promise<LoginResult> {
        try {
       //verificar se email existe
        console.log(email+" "+password)
       const user = await prismaClient.user.findFirst({
        where:{
            email:email
        }
       })
       if (!user){
        return { success: false, message: 'Credenciais inválidas' };
       }
       //verificar validade password
      
       if (user.password!==password){
        return { success: false, message: 'User/PassWord Invalido.',user };
       }
        if (user.email!==email){
        //return { ok: "Chamada serviço Auth" }
         
            return { success: false, message: 'User/PassWord Invalido.',user };
        }else{
            return { success: true, message: 'Login realizado com sucesso', user };
        }
    } catch (error) {
        console.error('Erro ao verificar o login:', error);
        throw new Error('Erro ao verificar o login');
      }
    }
}
export { AuthUserService }