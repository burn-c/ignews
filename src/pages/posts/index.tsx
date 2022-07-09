import { GetStaticProps } from "next";
import { useSession } from "next-auth/client"
import Link from "next/link";
import Head from "next/head";
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismiClient } from "../../services/prismic";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

type PostsProps = {
  posts: Post[];
  hasActiveSubscription: boolean;
}

import styles from './styles.module.scss'

export default function Posts({ posts }: PostsProps) {
  const [session] = useSession()

  const hasActiveSubscription = !!session?.activeSubscription

  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts?.map(({ slug, updatedAt, title, excerpt }) => (
            <Link key={slug} href={hasActiveSubscription ? `/posts/${slug}` : `/posts/preview/${slug}`}>
              <a>
                <time>{updatedAt}</time>
                <strong>{title}</strong>
                <p>{excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismiClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  // console.log(JSON.stringify(response, null, 2))

  return {
    props: { posts }
  }
}