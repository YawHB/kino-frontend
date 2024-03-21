import { useAuth } from "@/contexts/AuthProvider";
import UserReservations from "@/components/core/UserReservations.tsx";

export default function ProfilePage() {
    const auth = useAuth();

    return (
        <>
            <div className="flex flex-col gap-10">
                <div>
                    <h2 className="font-bold">Profile information</h2>
                    <p className="font-bold">
                        Username: <span className={"font-normal"}>{auth.username}</span>
                    </p>
                    <p className="font-bold">
                        Email: <span className={"font-normal"}>{auth.email}</span>
                    </p>
                </div>

                <div>
                    <h2 className="font-bold">Reservations:</h2>
                    <UserReservations />
                </div>
            </div>
        </>
    );

    //TODO: Show reservations
}
