import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContextProvider } from "../contexts/UserContext";
import Card from "../components/Card";
import ProfileTabs from "../components/ProfileTabs";
import ProfileContent from "../components/ProfileContent";

export default function FyPage() {
    const [profile, setProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const router = useRouter();
    const tab = router?.query?.tab?.[0] || 'posts';
    const session = useSession();
    const userId = router.query.id;

    const supabase = useSupabaseClient();

    useEffect(() => {
        if (!userId) {
            return;
        }
        fetchUser();
    }, [userId]);

    const isMyUser = userId === session?.user?.id;

    return (
        <Layout>
            <UserContextProvider>
                <Card noPadding={true}>
                    <div className="relative overflow-hidden rounded-md">
                        {/* <Cover url={profile?.cover} editable={isMyUser} onChange={fetchUser} /> */}
                        <div className="z-20 mx-auto flex justify-center">
                            <div
                                id="carouselExampleCaptions"
                                className="relative"
                                data-te-carousel-init
                                data-te-carousel-slide>
                                <div
                                    className="absolute right-0 bottom-0 left-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                                    data-te-carousel-indicators>
                                    <button
                                        type="button"
                                        data-te-target="#carouselExampleCaptions"
                                        data-te-slide-to="0"
                                        data-te-carousel-active
                                        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                        aria-current="true"
                                        aria-label="Slide 1"></button>
                                    <button
                                        type="button"
                                        data-te-target="#carouselExampleCaptions"
                                        data-te-slide-to="1"
                                        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                        aria-label="Slide 2"></button>
                                    <button
                                        type="button"
                                        data-te-target="#carouselExampleCaptions"
                                        data-te-slide-to="2"
                                        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                        aria-label="Slide 3"></button>
                                </div>
                                <div
                                    className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                                    <div
                                        className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                        data-te-carousel-active
                                        data-te-carousel-item>
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                                            className="block w-full"
                                            alt="..." />
                                        <div
                                            className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                            <h5 className="text-xl">First slide label</h5>
                                            <p>
                                                Some representative placeholder content for the first slide.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                        data-te-carousel-item>
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                                            className="block w-full"
                                            alt="..." />
                                        <div
                                            className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                            <h5 className="text-xl">Second slide label</h5>
                                            <p>
                                                Some representative placeholder content for the second slide.
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                        data-te-carousel-item>
                                        <img
                                            src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                                            className="block w-full"
                                            alt="..." />
                                        <div
                                            className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                                            <h5 className="text-xl">Third slide label</h5>
                                            <p>
                                                Some representative placeholder content for the third slide.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button"
                                    data-te-target="#carouselExampleCaptions"
                                    data-te-slide="prev">
                                    <span className="inline-block h-8 w-8">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </span>
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Previous</span
                                    >
                                </button>
                                <button
                                    className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                                    type="button"
                                    data-te-target="#carouselExampleCaptions"
                                    data-te-slide="next">
                                    <span className="inline-block h-8 w-8">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="h-6 w-6">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </span>
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >Next</span
                                    >
                                </button>
                            </div>

                        </div>
                        <div className='my-1 flex -m-1 flex-row flex-nowrap'>
                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Библиотека
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Авторы
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Сообщества
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Библиотека
                            </span>
                        </div>

                        <div className='my-1 flex -m-1 flex-row flex-nowrap'>
                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Фэнтэзи
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Фантастика
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Мистика
                            </span>

                            <span
                                className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-1 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                                Библиотека
                            </span>
                        </div>


                        <div className="flex flex-col my-4">
                            <div className='my-1 flex flex-row flex-nowrap font-semibold'>
                                <h1>Новинки</h1>
                            </div>
                            <div className='my-1 flex flex-row justify-between'>
                                <div>
                                    <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                    <div className="text-center font-semibold">Название</div>
                                </div>
                                <div>
                                    <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                    <div className="text-center font-semibold">Название</div>
                                </div>
                                <div>
                                    <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                    <div className="text-center font-semibold">Название</div>
                                </div>
                            </div>
                        </div>


                        <div className='my-1 flex flex-row flex-nowrap font-semibold'>
                            <h1>Популярное</h1>
                        </div>

                        <div className='my-1 flex flex-row justify-between'>
                            <div>
                                <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                <div className="text-center font-semibold">Название</div>
                            </div>
                            <div>
                                <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                <div className="text-center font-semibold">Название</div>
                            </div>
                            <div>
                                <div className="h-32 w-24 bg-slate-500 rounded-md"></div>
                                <div className="text-center font-semibold">Название</div>
                            </div>
                        </div>
                    </div>
                </Card>
                <ProfileContent activeTab={tab} userId={userId} />
            </UserContextProvider>
        </Layout>
    );
}