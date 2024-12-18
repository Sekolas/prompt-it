import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                // Veritabanında kullanıcıyı bul ve session bilgisini güncelle
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                return session;
            }
        },
        async signIn({ profile }) {
            try {
                // MongoDB bağlantısını başlat
                await connectToDB();

                // profile null olabilir, kontrol et
                if (!profile || !profile.email) {
                    console.error("Profile data is undefined or missing email");
                    return false;
                }

                // Kullanıcı mevcut mu kontrol et
                const userExist = await User.findOne({ email: profile.email });
                if (!userExist) {
                    // Yeni kullanıcı oluştur
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(/\s+/g, "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
