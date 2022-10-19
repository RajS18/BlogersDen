
import styles from '../styles/blog.module.css'
import Link from 'next/link';
import { useState,useEffect } from 'react';
const blog = (props) => {

  console.log(props);

   const [blogs, setBlogs] = useState(props.allBlogs);
  // useEffect(() => {
  //   //Client Side rendering
  //   fetch('http://localhost:3000/api/blogs').then((a) => {
  //     return a.json();
  //   })
  //     .then((parsed) => {
  //       console.log(parsed)
  //       setBlogs(parsed)
  //     })
  // }, [])

  return <div className={styles.container}>
        <main className={styles.main}>
            {blogs.map((blogitem) => {
                return <div key={blogitem.slug} className={styles.blogs}>
                    <Link href={`/blogpost/${blogitem.slug}`}>
                        <h3 className={styles.blogItemh3}>{blogitem.title}</h3></Link>
                    <p className={styles.blogItemp}>{blogitem.content.substr(0, 140)}...</p>
                    <h5>By: {blogitem.author}</h5>
                </div>
            })}
        </main>
    </div>
}
//The following function runs at server side:
//Server side rendering
export async function getServerSideProps(context) {
  let data = await fetch('http://localhost:3000/api/blogs')
  let allBlogs = await data.json()

  return {
      props: { allBlogs }, // will be passed to the page component as props

  }
}

export default blog