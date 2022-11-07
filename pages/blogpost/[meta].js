import React ,{useState,useEffect} from 'react';
import styles from '../../styles/blogpost.module.css';
import {useRouter} from 'next/router';
import * as fs from 'fs';


const Blogpost = (props) => {
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
                // //Server side rendering
                // export async function getServerSideProps(context) {
                //     //Context object is the property holding object (object with meta data about query) fro query received at the server end.
                //     //console.log(context.query)
                //     // const router = useRouter(); //UseRouter cannot be used at server side
                //     const { meta } = context.query;

                //     let data = await fetch(`http://localhost:3000/api/getblog?attr=${meta}`)
                //     let myBlog = await data.json()
                //     console.log(myBlog);
                //     return {
                //         props: { myBlog }, // will be passed to the page component as props
                //     }
                // }

//Static site generation for [file]

//get static path is used to collect all the files' path that are associated with the static bundle.
export async function getStaticPaths() {
    //this is hard coded but can be used via some logic
    return {
        paths: [
            { params: { meta: 'howtolearncpp' } },
            { params: { meta: 'howtolearncss' } },
            { params: { meta: 'howtolearnnext' } },
        ],
        fallback: true // false or 'blocking'
    };
}
//These paths are then passed to getStaticProps to generate static pages for each
export async function getStaticProps(context) {
    const { meta } = context.params;
    let myBlog = await fs.promises.readFile(`blogpostData/${meta}.json`, 'utf-8')
    return {
        props: { myBlog: JSON.parse(myBlog) }, // will be passed to the page component as props
    }
}

export default Blogpost