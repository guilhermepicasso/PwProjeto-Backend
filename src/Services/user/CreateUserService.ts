import prismaClient from "../../prisma";
interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        //verifica email ja cadastrado
        const userJaExiste = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        //verificar se email não foi enviado no body
        if (!email) {
            throw new Error("Email é obrigatório")
        }
        //verifica se email está duplicado no banco de dados
        if (userJaExiste) {
            throw new Error("user ja existe")
        }

        const user = await prismaClient.user.create(
            {
                data: {
                    name: name,
                    email: email,
                    password: password
                },
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        )
        return user
    }
}
export { CreateUserService }