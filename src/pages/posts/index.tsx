import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from '@prismicio/client'

import styles from './styles.module.scss'
import { getPrismiClient } from "../../services/prismic";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>A static website contains Web pages with fixed content. Technically, it is a simple list of HTML files, which displays the same information to every visitor. Unlike dynamic websites, they do not require any back-end programming or database. Publishing a static website is easy: the files are uploaded on a simple Web server or storage provider. The two main advantages of static websites are security and speed: there is no database so it can not be hacked and there is no need to render a page for each request, which makes Web browsing faster.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>A static website contains Web pages with fixed content. Technically, it is a simple list of HTML files, which displays the same information to every visitor. Unlike dynamic websites, they do not require any back-end programming or database. Publishing a static website is easy: the files are uploaded on a simple Web server or storage provider. The two main advantages of static websites are security and speed: there is no database so it can not be hacked and there is no need to render a page for each request, which makes Web browsing faster.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>A static website contains Web pages with fixed content. Technically, it is a simple list of HTML files, which displays the same information to every visitor. Unlike dynamic websites, they do not require any back-end programming or database. Publishing a static website is easy: the files are uploaded on a simple Web server or storage provider. The two main advantages of static websites are security and speed: there is no database so it can not be hacked and there is no need to render a page for each request, which makes Web browsing faster.
            </p>
          </a>
          <a href="">
            <time>12 de março de 2021</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>A static website contains Web pages with fixed content. Technically, it is a simple list of HTML files, which displays the same information to every visitor. Unlike dynamic websites, they do not require any back-end programming or database. Publishing a static website is easy: the files are uploaded on a simple Web server or storage provider. The two main advantages of static websites are security and speed: there is no database so it can not be hacked and there is no need to render a page for each request, which makes Web browsing faster.
            </p>
          </a>
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

  console.log(JSON.stringify(response, null, 2))

  return {
    props: {}
  }
}