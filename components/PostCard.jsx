import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }) => {
  const { title, slug, publishedDate, thumbnail } = post.fields;
  console.log(post);
  return (
    <section className='card'>
      <Image
        src={`https:${thumbnail.fields.file.url}`}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
      />
      <div className='content'>
        <div className='info'>
          <h4>{title}</h4>
          <p>{publishedDate}</p>
        </div>
        <div className='actions'>
          <Link href={`/post/${slug}`}>
            <a>read more</a>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #fff;
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }

        .content {
          /* margin: 0;
          position: relative;
          top: -40px;
          left: -10px; */
        }

        .info {
          padding: 16px;
        }

        .info h4 {
          margin: 4px 0;
          text-transform: uppercase;
        }

        .info p {
          margin: 0;
          color: #777;
        }

        .actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }

        .actions a {
          color: #fff;
          background: teal;
          padding: 16px 24px;
          text-decoration: none;
        }
      `}</style>
    </section>
  );
};

export default PostCard;
