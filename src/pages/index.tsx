import Head from 'next/head';
import Link from 'next/link';
import { Layout, Date } from '@/components';
import { siteTitle } from '@/components/layout';
import { getSortedPostsData } from '@/lib/posts';
import utilStyles from '@/styles/utils.module.css';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";

interface PostsProps {
  allPostsData: [
    {
      id: string,
      date: string,
      title: string,
    }
  ]
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({ allPostsData }: PostsProps) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <section>
        <h2 className="text-xxl">Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className="mb-8 text-lg font-custom first:mt-5" key={id}>
              <RoughNotation type="circle" color="#0d47a1" padding={10} strokeWidth={2} show={true}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
              </RoughNotation>
              <br />
              <small className='card'>
                <Date dateString={date} />
              </small>
            </li>          ))}
        </ul>
      </section>
    </Layout>
  );
}