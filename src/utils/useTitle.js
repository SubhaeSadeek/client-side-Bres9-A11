import { useEffect } from "react";

const useTitle = (title) => {
useEffect(()=>{
    document.title = `${title} | Hikmah Blogs`
}, [title]);
return null;
}

export default useTitle;