import Layout from "../components/Layout";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Link from "next/link";
import PostCard from "../components/PostCard";
import { useRouter } from "next/router";
import FriendInfo from "../components/FriendInfo";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Cover from "../components/Cover";
import BookTabs from "../components/BookTabs";
import ProfileContent from "../components/ProfileContent";
import { UserContextProvider } from "../contexts/UserContext";

import { motion } from "framer-motion";
import TopNavigationCard from "@/components/TopNavigationCard";

export default function BookPage() {
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

    function fetchUser() {
        supabase.from('profiles')
            .select()
            .eq('id', userId)
            .then(result => {
                if (result.error) {
                    throw result.error;
                }
                if (result.data) {
                    setProfile(result.data[0]);
                }
            });
    }

    function saveProfile() {
        supabase.from('profiles')
            .update({
                name,
                place,
            })
            .eq('id', session.user.id)
            .then(result => {
                if (!result.error) {
                    setProfile(prev => ({ ...prev, name, place }));
                }
                setEditMode(false);
            });
    }


    const isMyUser = userId === session?.user?.id;

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <Layout>
                <UserContextProvider>
                    <div className="z-10 bg-white md:static w-full top-0 visible xl:hidden 2xl:hidden lg:hidden">
                        <TopNavigationCard title="Профиль" />
                    </div>
                    <Card noPadding={true}>
                        <div className="relative overflow-hidden rounded-md">
                            {/* <Cover url={profile?.cover} editable={isMyUser} onChange={fetchUser} /> */}
                            <div className="z-20 mx-auto flex justify-center mt-8">
                                {/* {profile && (
                <Avatar url={profile.avatar} size={'lg'} editable={isMyUser} onChange={fetchUser} />
              )} */}
                                <div className="w-32 h-48 bg-slate-100 rounded-md"></div>
                            </div>
                            <div className="p-4 pt-0 md:pt-4 pb-0">
                                <div className="flex justify-center mt-3 mb-3">
                                    <div>
                                        {editMode && (
                                            <div>
                                                <input type="text"
                                                    className="border py-2 px-3 rounded-md"
                                                    placeholder={'Ваше имя'}
                                                    onChange={ev => setName(ev.target.value)}
                                                    value={name}
                                                />
                                            </div>
                                        )}
                                        {!editMode && (
                                            <h1 className="text-xl font-bold text-center mb-2">
                                                {/* {profile?.name} */}
                                                Название
                                            </h1>
                                        )}
                                        {!editMode && (
                                            <div className="text-gray-500 leading-3 text-center mb-4">
                                                {profile?.place || 'Дата публикации'}
                                            </div>
                                        )}
                                        {!editMode && (
                                            <div className="text-gray-500 leading-4 text-center">
                                                {profile?.place || 'Автор'}
                                            </div>
                                        )}
                                        {!editMode && (
                                            <h1 className="text-l font-medium text-center">
                                                {/* {profile?.name} */}
                                                User @useruser
                                            </h1>
                                        )}
                                        {editMode && (
                                            <div>
                                                <input type="text"
                                                    className="border py-2 px-3 rounded-md mt-1"
                                                    placeholder={'Ваше местоположение'}
                                                    onChange={ev => setPlace(ev.target.value)}
                                                    value={place} />
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className="flex justify-between text-xs flex-row flex-nowrap mt-5">
                                    <div>Читают: 24</div>
                                    <div className="flex flex-row">
                                        <svg className="mr-2 text-yellow-600" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.31429 6.93082C0.761745 6.35196 1.07914 5.39085 1.86774 5.25488L3.24295 5.01777C4.18299 4.8557 4.98992 4.25623 5.41652 3.40303L6.10557 2.02492C6.4741 1.28787 7.5259 1.28787 7.89443 2.02492L8.58348 3.40303C9.01008 4.25623 9.81701 4.8557 10.757 5.01777L12.1323 5.25488C12.9209 5.39085 13.2383 6.35196 12.6857 6.93081L11.5673 8.10252C10.9191 8.78157 10.6261 9.72488 10.7756 10.6516L11.0311 12.236C11.162 13.0471 10.313 13.6612 9.58358 13.283L8.38095 12.6594C7.51506 12.2104 6.48494 12.2104 5.61905 12.6594L4.41642 13.283C3.68701 13.6612 2.83803 13.0471 2.96886 12.236L3.2244 10.6516C3.37388 9.72488 3.08092 8.78157 2.43274 8.10252L1.31429 6.93082Z" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                        <p>78</p>
                                    </div>
                                    <div>125 стр.</div>
                                </div>
                                <div className="flex mx-auto justify-between mt-2 mb-2 justify-items-center font-medium">
                                    <Link href={'/read'} className="bg-slate-300 px-3 py-1 w-56 my-auto rounded-md text-center">Начать читать</Link>
                                    <button
                                        onClick={() => {
                                            setEditMode(true);
                                            setName(profile.name);
                                            setPlace(profile.place);
                                        }}
                                        className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </button>

                                </div>
                                <div className="flex mx-auto justify-between mt-2 mb-2 justify-items-center">

                                    <div className="my-auto">
                                        <div className="text-center">
                                            {isMyUser && !editMode && (
                                                <button
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setName(profile.name);
                                                        setPlace(profile.place);
                                                    }}
                                                    className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                                                    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.31429 10.0006C0.761746 9.42172 1.07914 8.46061 1.86774 8.32465L5.94063 7.62242C6.88066 7.46035 7.68759 6.86088 8.11419 6.00768L10.1056 2.02492C10.4741 1.28787 11.5259 1.28787 11.8944 2.02492L13.8858 6.00768C14.3124 6.86088 15.1193 7.46035 16.0594 7.62242L20.1323 8.32465C20.9209 8.46061 21.2383 9.42172 20.6857 10.0006L17.6138 13.2188L18.3371 13.9093L17.6138 13.2188C16.9656 13.8979 16.6726 14.8412 16.8221 15.7679L17.5428 20.236C17.6736 21.0471 16.8246 21.6612 16.0952 21.283L12.3809 19.3571C11.5151 18.9081 10.4849 18.9081 9.61905 19.3571L5.90479 21.283C5.17538 21.6612 4.3264 21.0471 4.45723 20.236L5.17789 15.7679C5.32737 14.8412 5.03441 13.8979 4.38623 13.2188L1.31429 10.0006Z" stroke="currentColor" strokeWidth="2" />
                                                    </svg>

                                                </button>
                                            )}
                                            {isMyUser && editMode && (
                                                <button onClick={saveProfile} className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                                                    Сохранить
                                                </button>
                                            )}
                                            {isMyUser && editMode && (
                                                <button onClick={() => setEditMode(false)} className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                                                    Отмена
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="flex mx-auto justify-around mt-2 mb-2 justify-items-center">
                                <button className="text-black px-3 py-3 my-auto rounded-md">Поддержать</button>
                            </div> */}
                                <BookTabs active={'/book-description'} userId={profile?.id}/>
                            </div>
                        </div>
                    </Card>
                    <ProfileContent activeTab={tab} userId={userId} />
                </UserContextProvider>
            </Layout>
        </motion.div>

    );
}