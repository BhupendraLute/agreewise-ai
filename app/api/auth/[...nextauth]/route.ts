import { connectToDatabase } from "@/lib/db/mongoose";
import { IUser, User } from "@/models/user.model";
import NextAuth, {
	AuthOptions,
	Session,
	User as NextAuthUser,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		async signIn({ user }: { user: NextAuthUser }) {
			try {
				await connectToDatabase();

				const existingUser = await User.findOne({ email: user.email });

				if (!existingUser) {
					await User.create({
						name: user.name,
						email: user.email,
						avatar: user.image,
						role: "candidate",
						hasCompletedProfile: false,
					});
				}
			} catch (error) {
				console.error("Error during signIn callback:", error);
				return false;
			}

			return true;
		},
		async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
			try {
				if (user) {
					await connectToDatabase();

					const dbUser = await User.findOne({ email: user.email });

					if (dbUser) {
						token.id = dbUser._id.toString();
						token.name = dbUser.name;
						token.avatar = dbUser.avatar;
					}
				}
			} catch (error) {
				console.error("Error during jwt callback:", error);
				throw new Error("Failed to fetch user data :: SignIn failed");
			}

			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			try {
				if (token) {
					session.user.id = token.id as string;
					session.user.name = token.name as string;
					session.user.avatar = token.avatar as string;
				}
			} catch (error) {
				console.error("Error during session callback:", error);
				throw new Error("Failed to fetch user data :: Session failed");
			}

			return session;
		},
	},

	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},

	secret: process.env.NEXTAUTH_SECRET!,
	pages: {
		signIn: "/auth/signin",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
