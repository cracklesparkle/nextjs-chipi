import Card from "./Card";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import mainLogo from "../images/logo.svg";
import Avatar from "./Avatar";
import HomeTabs from "./HomeTabs";

export default function TopNavigationCard() {
  const router = useRouter();
  const { asPath: pathname } = router;
  
  const supabase = useSupabaseClient();
  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <Card noPadding={true}>
      <div className="px-4 py-4 flex justify-between md:block">
        {/* <h2 className="text-gray-400 mb-3 hidden md:block">Navigation</h2> */}
        <img src={mainLogo.src} className="my-auto flex justify-center w-10 h-10 border rounded-full"></img>
        <h1 className="text-xl my-auto text-center">Главная</h1>

        <Link href="/notifications" className="w-10 h-10 justify-center flex my-auto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="hidden md:block">Уведомления</span>
        </Link>
      </div>
      <div className="px-4 py-2 flex md:block border-b-2 justify-center">
        <HomeTabs/>
        {/* <h1 className="text-l my-auto text-center">Новости</h1>
        <h1 className="text-l my-auto text-center">Для Вас</h1> */}
      </div>
    </Card>
  );
}