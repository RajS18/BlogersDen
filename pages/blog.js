
import styles from '../styles/blog.module.css'
import Link from 'next/link';
import { useState } from 'react';
import * as fs from 'fs';


const Blog = (props) => {

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
            <h1>All Popular Blogposts</h1>
            {blogs.map((blogitem) => {
                return <div key={blogitem.slug} className={styles.blogs}>
                    <Link href={`/blogpost/${blogitem.slug}`}>
                        <h3 className={styles.blogItemh3}>{blogitem.title}</h3></Link>
                    <p className={styles.blogItemp}>{blogitem.metaDescription.substr(0, 140)}...</p>
                    <span className={styles.butn}>
                        <div className={styles.btwn}>
                            <div>By: {blogitem.author}</div>
                            <Link href={`/blogpost/${blogitem.slug}`}><div><button>Read more</button></div></Link>
                        </div>
                    </span>

                </div>
            })}
        </main>
    </div>
}
//The following function runs at server side:
//Server side rendering
// export async function getServerSideProps(context) {
// let data = await fetch('http://localhost:3000/api/blogs')
// let allBlogs = await data.json()

// return {
//     props: { allBlogs }, // will be passed to the page component as props

// }
// }

// This code is for Static site generation. here we will generate this page before even it is requested as a bundle in some directory called out at server.
//Whenever this request is called for, severs or rather we should call it CDN where a static site is transfered to when built by the server 
// and dump it as it is onto the the client ip motre fast.

export async function getStaticProps(context) {
    let data = await fs.promises.readdir("blogpostData");
    let myfile;
    let allBlogs = [];
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        console.log(item)
        myfile = await fs.promises.readFile(('blogpostData/' + item), 'utf-8')
        allBlogs.push(JSON.parse(myfile))
    }

    return {
        props: { allBlogs }, // will be passed to the page component as props
    }
}

export default Blog