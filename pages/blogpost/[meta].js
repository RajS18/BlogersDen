import React ,{useState,useEffect} from 'react'
import styles from '../../styles/blogpost.module.css'
import {useRouter} from 'next/router';

const blogpost = () => {
  const [blog, setBlog] = useState();

    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        const { meta } = router.query;
        fetch(`http://localhost:3000/api/getblog?attr=${meta}`).then((a) => {
            return a.json();
        })
            .then((parsed) => {
                setBlog(parsed)
            })
    }, [router.isReady])
    console.log(blog);
    return <div className={styles.container}>
        <main className={styles.main}>
            <h1>{blog && blog.title}</h1>
            <hr />
            <div>
                {blog && blog.content}
            </div>
            <hr />
            <div>- by {blog && blog.author}</div>
        </main>
    </div>;
}

export default blogpost