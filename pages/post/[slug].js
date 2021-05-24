import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

const option = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
        />
      );
    },
  },
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: 'blogPost' });
  const paths = response.items.map((item) => ({
    params: {
      slug: item.fields.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  return {
    props: {
      post: items[0],
    },
  };
};

const Post = ({ post }) => {
  const { featuredImage, title, publishedDate, content } = post.fields;
  console.log(content);
  return (
    <>
      <section className='banner'>
        {featuredImage && (
          <Image
            src={`https:${featuredImage.fields.file.url}`}
            width={featuredImage.fields.file.details.image.width}
            height={featuredImage.fields.file.details.image.height}
          />
        )}
        <h2>{title}</h2>
      </section>
      <article className='content'>
        <p>{publishedDate}</p>
        <div>{documentToReactComponents(content, option)}</div>
      </article>

      <style jsx>{`
        h2,
        h3 {
          text-transform: uppercase;
        }

        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          /* position: relative; */
          /* top: -60px;
          left: -10px;
          transform: rotateZ(-1deg); */
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        /* 
        .content p {
          margin: 0;
        } */
      `}</style>
    </>
  );
};

export default Post;
