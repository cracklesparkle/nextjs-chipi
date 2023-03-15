import PostCard from "./PostCard";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import mainLogo from '../images/logo.svg'
import Link from "next/link";
import Avatar from "../components/Avatar";

import { motion } from "framer-motion";

export default function ProfileContent({ activeTab, userId }) {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const supabase = useSupabaseClient();
  useEffect(() => {
    if (!userId) {
      return;
    }
    if (activeTab === 'posts') {
      loadPosts().then(() => { });
    }
  }, [userId]);

  async function loadPosts() {
    const posts = await userPosts(userId);
    const profile = await userProfile(userId);
    setPosts(posts);
    setProfile(profile);
  }

  async function userPosts(userId) {
    const { data } = await supabase.from('posts')
      .select('id, content, created_at, author')
      .eq('author', userId);
    return data;
  }

  async function userProfile(userId) {
    const { data } = await supabase.from('profiles')
      .select()
      .eq('id', userId);
    return data?.[0];
  }

  return (
    <motion.div initial={{opacity: 0 }}
    animate={{ opacity: 1 }}> 
      {activeTab === 'posts' && (
        <div>
          {posts?.length > 0 && posts.map(post => (
            <PostCard key={post.created_at} {...post} profiles={profile} />
          ))}
        </div>
      )}
      {activeTab === 'about' && (
        <div>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <div className="flex justify-between">
                  <div>
                    <Link href={'/profile'}>
                      <span className="cursor-pointer">
                        <Avatar url={mainLogo.src} />
                      </span>
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link href={'/profile/' + ''}>
                        <span className="mr-1 font-semibold cursor-pointer hover:underline">
                          User
                        </span>
                      </Link>
                    </p>
                  </div>
                  <span>Рейтинг</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <div>
                    <Link href={'/profile'}>
                      <span className="cursor-pointer">
                        <Avatar url={mainLogo.src} />
                      </span>
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link href={'/profile/' + ''}>
                        <span className="mr-1 font-semibold cursor-pointer hover:underline">
                          User
                        </span>
                      </Link>
                    </p>
                  </div>
                  <span>Рейтинг</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <div>
                    <Link href={'/profile'}>
                      <span className="cursor-pointer">
                        <Avatar url={mainLogo.src} />
                      </span>
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link href={'/profile/' + ''}>
                        <span className="mr-1 font-semibold cursor-pointer hover:underline">
                          User
                        </span>
                      </Link>
                    </p>
                  </div>
                  <span>Рейтинг</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <div>
                    <Link href={'/profile'}>
                      <span className="cursor-pointer">
                        <Avatar url={mainLogo.src} />
                      </span>
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link href={'/profile/' + ''}>
                        <span className="mr-1 font-semibold cursor-pointer hover:underline">
                          User
                        </span>
                      </Link>
                    </p>
                  </div>
                  <span>Рейтинг</span>
                </div>
              </Card>
              {/* <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
            </div>
            <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
              <img src="https://images.unsplash.com/photo-1601581874834-3b6065645e07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
            </div> */}
            </div>
          </Card>
        </div>
      )}
      {activeTab === 'community' && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Сообщества</h2>
            <div className="">
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {activeTab === 'photos' && (
        <div>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <div className="flex justify-between">
                  <span>Книги</span>
                  <span>4</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <span>Прочитанные книги</span>
                  <span>5</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <span>Отзывы пользователя</span>
                  <span>2</span>
                </div>
              </Card>
              <Card>
                <div className="flex justify-between">
                  <span>Коллекции</span>
                  <span></span>
                </div>
              </Card>
              {/* <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img src="https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img src="https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img src="https://images.unsplash.com/photo-1601581874834-3b6065645e07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""/>
              </div> */}
            </div>
          </Card>
        </div>
      )}
    </motion.div>
  );
}