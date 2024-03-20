import { useAuth } from "@/contexts/AuthProvider";
import UserReservations from "@/components/core/UserReservations.tsx";

export default function ProfilePage() {
    const auth = useAuth();

    return (
        <>
            <div>
                <p className="font-bold">Username: <span className={"font-normal"}>{auth.username}</span></p>
                <p className="font-bold">Email: <span className={"font-normal"}>{auth.email}</span></p>
            </div>
            <div>
                <UserReservations/>
            </div>
        </>
    );

    //TODO: Show reservations
}
