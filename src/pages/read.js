import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserContextProvider } from "../contexts/UserContext";
import Card from "../components/Card";
import ReadNavigationCard from "@/components/ReadNavigationCard";
import { motion } from "framer-motion";
export default function ReadPage() {
    const [posts, setPosts] = useState([]);
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
                <div className="z-10 bg-white md:static w-full top-0 visible sticky xl:hidden 2xl:hidden lg:hidden">
                    <ReadNavigationCard title="Книга" tabs={tabs} tab="/" />
                </div>
                {/* <h1 className="text-6xl mb-4 text-gray-300">Библиотека</h1>
        {posts.length > 0 && posts.map(post => (
          <div key={post.id}>
            <PostCard {...post} />
          </div>
        ))} */}
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                    <Card>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices dolor ac diam sagittis ultrices. Pellentesque scelerisque urna a mattis blandit. Proin elementum urna sit amet sapien fermentum ultrices. Suspendisse mi ex, porttitor ac sem sit amet, imperdiet auctor sapien. Mauris iaculis nibh in ligula lobortis, placerat pharetra nisi porta. Phasellus commodo turpis ut arcu finibus, non sollicitudin mi gravida. Proin iaculis urna orci, in consectetur nulla rhoncus eu. Mauris ac ex magna. Aliquam et orci eget nisi luctus convallis nec et eros. Sed luctus tellus non convallis fringilla.

                                Quisque mi nibh, auctor nec malesuada molestie, pellentesque id libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut molestie tincidunt ultrices. Nam et metus placerat, porttitor enim ut, mattis odio. In sem lacus, venenatis et fringilla sit amet, luctus vitae massa. Vivamus faucibus felis neque, elementum mollis magna blandit sed. Curabitur turpis libero, luctus ac risus et, dictum fringilla mauris. Nam quis feugiat massa, quis pulvinar arcu.

                                Ut tempor lacus et leo tincidunt laoreet. Fusce egestas turpis at molestie posuere. Suspendisse quis dignissim arcu. Mauris ac enim sit amet neque elementum tincidunt. In mollis maximus mi, nec interdum ante facilisis vitae. Mauris ac consectetur risus. Cras ullamcorper turpis at lacus ornare commodo. Nam consequat quis purus at pharetra. Cras vitae aliquet neque. Aenean risus ex, malesuada sit amet porttitor in, tristique eget nunc. Curabitur vitae posuere metus. Curabitur semper in ipsum consectetur tempor. Nunc fringilla odio eu urna convallis convallis.

                                Duis vestibulum posuere interdum. Pellentesque eget neque ut tellus accumsan faucibus vel a ipsum. Maecenas congue consectetur sem, ac fermentum sem imperdiet non. Morbi enim neque, ultrices vel sapien vitae, tempor posuere ligula. Mauris et fringilla turpis, congue vehicula diam. Donec hendrerit, nisl eget facilisis accumsan, velit risus pellentesque nulla, in eleifend magna neque at nulla. Aenean vulputate iaculis porta. Vestibulum porta metus urna, et sagittis sem semper varius. Maecenas luctus tortor sem, vel malesuada ligula semper quis. Pellentesque pellentesque finibus egestas. In sodales metus velit, at iaculis nunc ullamcorper ac. Aliquam quam felis, ultricies id semper ut, egestas non libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

                                Fusce at urna sit amet sem condimentum dictum. In fermentum dui sit amet mi euismod, id gravida tellus posuere. Nullam non lacus et elit malesuada interdum. Nunc tincidunt lacus felis, non feugiat eros ultrices ac. Aenean id mollis lorem, consectetur posuere mi. Integer in lorem tincidunt, placerat massa in, ultricies augue. Vivamus id dui erat. Mauris venenatis eros vel velit molestie, vel luctus nibh fringilla. Proin interdum suscipit mi a lacinia. Etiam ut dolor mollis, eleifend odio id, semper massa.


                            </Card>
                        </div>
                    </Card>
                </motion.div>
            </UserContextProvider>
        </Layout>
    );
}