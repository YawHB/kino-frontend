import { useForm} from "react-hook-form";
import { Calendar } from "@/components/ui/calendar"
import {useState} from "react";


type FormValues = {
    id: string,
}

type Props = {
    handleSearch: (id: string) => void;
    onSubmit: (formValues: {id: number, premiere: Date}) => void;
    isSuccess: boolean
}


export default function CreateMovieForm({handleSearch, onSubmit, isSuccess}: Props) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset

    } = useForm<FormValues>();



    return (
            <>
                <form className="flex flex-col p-3 bg-slate-300 gap-4 items-center justify-center h-full" onSubmit={handleSubmit(({id}) => {
                    const correctDate = new Date(date!);
                    correctDate.setDate(date!.getDate() + 1)
                    onSubmit({id: Number(id), premiere: correctDate})
                })}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="id">TMDB Id</label>
                        <input {...register("id", {required: true})} />
                        <input className={"bg-red-500 hover:cursor-pointer"} onClick={() => handleSearch(getValues("id"))} type="button" value="Find"/>
                        {errors.id?.type === "required" && <p>TMDB id is required</p>}
                    </div>

                    <div>
                        <label htmlFor="premiere">Premiere</label>
                        <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            fromDate={new Date()}
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div>

                    <input disabled={!isSuccess} className={`${isSuccess ? "hover:cursor-pointer bg-green-500" : "bg-red-500"} mt-3`} type="submit" value="Submit"/>
                </form>
            </>
    )
}