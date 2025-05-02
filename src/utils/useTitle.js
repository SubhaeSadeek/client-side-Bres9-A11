import { useEffect } from "react";

const useTitle = (title) => {
useEffect(()=>{
    document.title = `${title} | Gadget Heaven`
}, [title]);
return null;
}

export default useTitle;