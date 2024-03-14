import { useParams } from "react-router-dom";



export default function MovieDetailsPage() {
    const { id } = useParams();

    return (
        <>
            <div>{id}</div> 
        </>
    )
}
