import { connectDb } from "@/libs/mongodb";
import User from "@/models/user";
import nextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

const handler = nextAuth({
    providers: [
        CredentialsProvider( {
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'tuemail@gmail.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '*******',
                },
            },
            async authorize(credentials, req) {
               
                connectDb()
                
                const userFound = await User.findOne({email: credentials?.email}).select("+password");
                if(!userFound) throw new Error("Invalid credentials");

                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
              
                if(!passwordMatch) throw new Error("Invalid credentials");
            
                return userFound; 
            }
          
        })
    ],
    callbacks: {
        jwt({account, token, user, profile, session}) {
            if(user)token.user = user
            return token; 
        },
        session({session, token}) {
            session.user = token.user as any
            return session;
        }
    },
    pages: {
        signIn: '/login',
    }
})

export {handler as GET, handler as POST}