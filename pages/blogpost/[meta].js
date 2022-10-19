import React ,{useState,useEffect} from 'react'
import styles from '../../styles/blogpost.module.css'
import {useRouter} from 'next/router';

const blogpost = (props) => {
  const [blog, setBlog] = useState(props.myBlog);

    // const router = useRouter();
    // //Client side rendering
    // useEffect(() => {
    //     if (!router.isReady) return;
    //     const { meta } = router.query;
    //     fetch(`http://localhost:3000/api/getblog?attr=${meta}`).then((a) => {
    //         return a.json();
    //     })
    //         .then((parsed) => {
    //             setBlog(parsed)
    //         })
    // }, [router.isReady])
    // console.log(blog);
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
//Server side rendering
export async function getServerSideProps(context) {
    //Context object is the property holding object (object with meta data about query) fro query received at the server end.
    //console.log(context.query)
    // const router = useRouter(); //UseRouter cannot be used at server side
    const { meta } = context.query;

    let data = await fetch(`http://localhost:3000/api/getblog?attr=${meta}`)
    let myBlog = await data.json()
    console.log(myBlog);
    return {
        props: { myBlog }, // will be passed to the page component as props
    }
}

export default blogpost