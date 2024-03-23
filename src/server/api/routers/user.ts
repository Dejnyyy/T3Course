import { UserRegisterSchema } from "@/server/types/user";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
    register: publicProcedure
    .input(UserRegisterSchema)
    .mutation(async ({ input,ctx }) => { 
        console.log(input);
        const seed = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(input.password, seed);

        const response = await ctx.db.user.create({
            data: {
                email: input.email,
                surname: input.surname,
                name: input.name,
                password: hashedPassword
            }
        })

        if(!response){
            throw new Error("User not created");
        }

        return response;
    })
})