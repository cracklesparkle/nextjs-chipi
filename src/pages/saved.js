import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import {useEffect, useState} from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {UserContextProvider} from "../contexts/UserContext";
import Card from "../components/Card";
import TopNavigationCard from "@/components/TopNavigationCard";

export default function SavedPostsPage() {
  const [posts,setPosts] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();
  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from('saved_posts')
      .select('post_id')
      .eq('user_id', session.user.id)
      .then(result => {
        const postsIds = result.data.map(item => item.post_id);
        supabase
          .from('posts')
          .select('*, profiles(*)').in('id', postsIds)
          .then(result => setPosts(result.data));
      });
  }, [session?.user?.id]);

  const tabs = ["Читаю", "Пишу"]
  return (
    <Layout>
      <UserContextProvider>
      <div className="z-10 bg-white md:static w-full top-0 visible xl:hidden 2xl:hidden lg:hidden">
          <TopNavigationCard title="Полка" tabs={tabs} tab="/"/>
        </div>
        {/* <h1 className="text-6xl mb-4 text-gray-300">Библиотека</h1>
        {posts.length > 0 && posts.map(post => (
          <div key={post.id}>
            <PostCard {...post} />
          </div>
        ))} */}
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
            </div>
          </Card>
        </div>
      </UserContextProvider>
    </Layout>
  );
}