import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text", placeholder: "John Doe" },
        email: {
          label: "Email",
          type: "text",
          placeholder: "JohnDoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // zod validation, OTP validation here
        let hashedPassword = "";
        bcrypt.hash(credentials.password, 10, (err, hash) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Hashed Password:", hash);
          hashedPassword = hash;
        });

        try {
          const existingUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          // console.log(existingUser);

          if (existingUser) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (passwordMatch) {
              console.log("Password Matched!");
              return {
                id: existingUser.id,
                email: existingUser.email,
                role: existingUser.role,
                fullname: existingUser.fullName,
              };
            } else {
              console.log("Password Mismatch!");
              return null;
            }
          }
        } catch (error) {
          console.log(JSON.stringify(error));
        }

        try {
          const user = await prisma.user.create({
            data: {
              fullName: credentials.fullName,
              email: credentials.email,
              password: hashedPassword,
              role: "Admin", // defaulting to user, will change the role using queries in psql
            },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
            fullName: user.fullName,
          };
        } catch (e) {
          console.error(e);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
