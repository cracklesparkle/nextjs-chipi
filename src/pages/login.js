import Layout from "../components/Layout";
import Card from "../components/Card";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import mainLogo from "../images/logo.svg";


export default function LoginPage() {
  const supabase = useSupabaseClient();
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
  return (
    <Layout hideNavigation={true}>
      <div className="h-screen flex items-center">
        <div className="max-w-xs mx-auto grow -mt-24">
          <svg className="login-logo mx-auto" width="271" height="130" viewBox="0 0 271 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M47 36.3457C51.9105 29.4906 57.1795 23.5696 63.8165 19.3534C72.0693 14.1107 80.862 14.024 89.4861 17.7604C101.802 23.0963 111.173 37.2858 124.365 39.8671C137.747 42.4857 153.692 37.2347 162.469 23.5176C165.04 19.4986 168.413 10.6264 162.914 7.92271C157.202 5.1144 151.987 9.11035 148.299 14.6022C141.191 25.1876 138.028 39.0786 135.909 52.3878C134.34 62.2477 133.529 72.74 133.529 82.7951C133.529 92.9627 134.757 103.945 139.09 112.699C146.26 127.186 166.977 124.285 177.128 116.836C183.324 112.288 193.143 100.738 201.151 86.6519C207.557 72.5662 223.573 -5.52023 197.948 14.6022" stroke="#41D0C8" strokeWidth="13" strokeLinecap="round" className="svg-elem-1"></path>
            <path d="M79 31C79 73.5149 58.6522 156.52 7 99.8336" stroke="#FF9446" strokeWidth="13" strokeLinecap="round" className="svg-elem-2"></path>
            <path d="M196.396 15C179.496 44.803 213.297 155.591 264 99.2767" stroke="#3FC7DA" strokeWidth="13" strokeLinecap="round" className="svg-elem-3"></path>
          </svg>

          <h1 className="text-xl mb-6 mt-4 font-bold text-center login-branded"><span className="text-orange-500">
            Читай пиши - </span><span className="text-teal-500">пиши читай</span>
          </h1>
          <Card noPadding={true}>
            <div className="rounded-md">

              <div className="flex flex-col space-y-1 mb-4">
                <input type="text" name="username" id="username" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Логин" />
              </div>

              <div className="flex flex-col space-y-1 mb-4">
                <input type="password" name="password" id="password" className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow" placeholder="Пароль" />
              </div>


              <Link href="/" className="flex gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue hover:rounded-md hover:shadow-md hover:shadow-gray-300 transition-all">
                Войти
              </Link>

              <Link href="/" className="flex gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue hover:rounded-md hover:shadow-md hover:shadow-gray-300 transition-all">
                Зарегистрироваться
              </Link>
              <p className="flex gap-4 items-center justify-center mt-4 mb-4">или</p>
              <button onClick={loginWithGoogle} className="flex w-full gap-4 items-center justify-center p-4 border-b border-b-gray-100 hover:bg-socialBlue hover:text-white hover:border-b-socialBlue hover:rounded-md hover:shadow-md hover:shadow-gray-300 transition-all">
                <svg className="h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                Войти через Google
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
