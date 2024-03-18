import CreateScreeningForm from "@/components/forms/CreateScreeningForm.tsx";
import {createScreening, TScreeningRequest} from "@/services/apiFacade.ts";
import {useToast} from "@/components/ui/use-toast.ts";


export default function CreateScreeningPage() {
    const { toast } = useToast();

    const onSubmit = (screeningRequest: TScreeningRequest) => {
        createScreening(screeningRequest)
            .then(() => {
                toast({
                    title: "Screening created!",
                    description: `Success!`,
                });
            })
            .catch(() => {
                toast({
                    title: "Something went wrong!",
                    description: `Could not create the screening. Try again`,
                    variant: "destructive"
                });
            })
    }

    return (
        <>
            <h2 className="text-center">Screening page</h2>
            <CreateScreeningForm onSubmit={onSubmit}/>
        </>
    )
}