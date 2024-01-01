import { useEffect } from "react"

//chganges the title shown o nthe browser tab. Put anywhere with argument title to change.
const useTitle = (title) => {

    useEffect(() => {
        const prevTitle = document.title
        document.title = title

        return () => document.title = prevTitle
    }, [title])

}

export default useTitle