import ClientProvider from "@/components/ClientProvider";
import Login from "@/components/Login";
import { SessionProvider } from "@/components/SessionProvider";
import Sidebar from "@/components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "./globals.css";

export const metadata = {
  title: "ChatGPT Clone",
  description: "have fun with it!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  //console.log(session);

  return (
    <html lang="en">
      <body className="bg-danviolet-800">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <Sidebar />

              <div className="relative flex-1 bg-danviolet-800">
                <ClientProvider />
                {children}
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
