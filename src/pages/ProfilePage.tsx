import { useAuth } from "@/contexts/AuthProvider";

export default function ProfilePage() {
    const auth = useAuth();

    return (
        <>
            <div>{auth.username}</div>
            <div>{auth.email}</div>
        </>
    );

    //TODO: Show reservations
}
