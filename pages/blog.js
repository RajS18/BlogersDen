
import styles from '../styles/blog.module.css'
import Link from 'next/link';
import { useState,useEffect } from 'react';
const blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/blogs').then((a) => {
      return a.json();
    })
      .then((parsed) => {
        console.log(parsed)
        setBlogs(parsed)
      })
  }, [])

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

export default blog