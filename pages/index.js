import { createClient } from 'contentful';
import Head from 'next/head';
import PostCard from 'components/PostCard';
import styles from 'styles/Home.module.css';

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const response = await client.getEntries({ content_type: 'blogPost' });
  return {
    props: { posts: response.items },
    revalidate: 1,
  };
};

const Posts = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog | Home</title>
        <meta name='keywords' content='test' />
      </Head>
      <main className='post-list'>
        {posts.map((post) => (
          <PostCard key={post.sys.id} post={post} />
        ))}
      </main>

      <style jsx>{`
        .post-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </>
  );
};

export default Posts;
