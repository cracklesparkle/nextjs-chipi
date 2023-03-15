import Card from "./Card";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import mainLogo from "../images/logo.svg";
import Avatar from "./Avatar";


import HomeTabs from "./HomeTabs";

export default function ReadNavigationCard({ title, tabs, tab, bookTitle }) {
  const router = useRouter();
  //const tab = router?.query?.tab?.[0] || '/';
  const { asPath: pathname } = router;

  const supabase = useSupabaseClient();
  async function logout() {
    await supabase.auth.signOut();
  }


  return (
    <Card noPadding={true}>
      <div className="px-4 py-4 flex justify-between md:block">
        {/* <h2 className="text-gray-400 mb-3 hidden md:block">Navigation</h2> */}
        <Link href="/book" className="w-10 h-10 justify-center flex my-auto">
          <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14.5" cy="14.5" r="13.5" stroke="#2C8FC7" stroke-width="2" />
            <path d="M4.61974 13.497C4.22922 13.8875 4.22922 14.5207 4.61974 14.9112L10.9837 21.2752C11.3742 21.6657 12.0074 21.6657 12.3979 21.2752C12.7884 20.8846 12.7884 20.2515 12.3979 19.861L6.74106 14.2041L12.3979 8.54725C12.7884 8.15672 12.7884 7.52356 12.3979 7.13303C12.0074 6.74251 11.3742 6.74251 10.9837 7.13303L4.61974 13.497ZM24.2656 13.2041L5.32685 13.2041L5.32685 15.2041L24.2656 15.2041L24.2656 13.2041Z" fill="#2C8FC7" />
          </svg>

        </Link>

        <div className="flex flex-col">
          <h1 className="text-xl my-auto text-center">{title}</h1>
          <h1 className="text-l my-auto text-center">{bookTitle ? bookTitle : 'Lorem ipsum'}</h1>
          <h1 className="text-sm my-auto text-center">{bookTitle ? bookTitle : '1989'}</h1>
        </div>


        <Link href="/notifications" className="w-10 h-10 justify-center flex my-auto">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.7363 16.3629L26.8138 24.4404C27.4691 25.0957 27.4691 26.1581 26.8138 26.8134C26.1585 27.4688 25.096 27.4688 24.4407 26.8134L16.3632 18.736L18.7363 16.3629Z" fill="#2C8FC7" />
            <path d="M20.4763 10.7382C20.4763 16.1164 16.1164 20.4763 10.7382 20.4763C5.35992 20.4763 1 16.1164 1 10.7382C1 5.35993 5.35992 1 10.7382 1C16.1164 1 20.4763 5.35993 20.4763 10.7382Z" stroke="#2C8FC7" stroke-width="2" />
          </svg>

          <span className="hidden md:block">Уведомления</span>
        </Link>
      </div>
      <div className="px-4 py-2 flex md:block border-b-2 justify-center rounded-b-md">
        {/* {tabs != null && <HomeTabs active={tab} tabs={tabs} />} */}
        {/* <h1 className="text-l my-auto text-center">Новости</h1>
        <h1 className="text-l my-auto text-center">Для Вас</h1> */}
      </div>
    </Card>
  );
}