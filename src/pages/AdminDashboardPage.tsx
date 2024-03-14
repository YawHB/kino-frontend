import {Link} from "react-router-dom";


export default function AdminDashboardPage() {


    return (
        <>
            <h2 className={"text-center m-6"}>Admin Dashboard</h2>
            <div className="flex flex-wrap justify-evenly">
                <Link to={"movie"}>
                    <div className="bg-green-500 h-60 w-40">
                        Add Movie
                    </div>
                </Link>
                <Link to={"screening"}>
                    <div className="bg-green-500 h-60 w-40">
                        Create Screening
                    </div>
                </Link>
                <Link to={"reservations"}>
                    <div className="bg-green-500 h-60 w-40">
                        See Reservations
                    </div>
                </Link>
            </div>
        </>
    )
}