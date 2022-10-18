import React from 'react'
import {useRouter} from 'next/router'

const slug = () => {
    const router = useRouter();
    const {meta} = router.query;
    //Basic dynamic routing.
  return (

    <div>OK wrong: {meta}</div>
  )
}

export default slug