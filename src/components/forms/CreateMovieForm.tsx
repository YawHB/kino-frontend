import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { ReactNode, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type FormValues = {
    id: string;
};

type Props = {
    handleSearch: (id: string) => void;
    onSubmit: (formValues: { id: number; premiere: Date }) => void;
    isSuccess: boolean;
    children: ReactNode;
};

export default function CreateMovieForm({ handleSearch, onSubmit, isSuccess, children }: Props) {
    const [date, setDate] = useState<Date | undefined>(undefined);

    console.log(date);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<FormValues>();

    return (
        <section className="m-auto my-10 max-w-lg animate-fade-in">
            <form
                className="form"
                onSubmit={handleSubmit(({ id }) => {
                    const correctDate = new Date(date!);
                    correctDate.setDate(date!.getDate() + 1);
                    onSubmit({ id: Number(id), premiere: correctDate });
                })}
            >
                <h2 className="mb-5 text-2xl font-bold">Add Movie</h2>
                <div className="flex flex-col items-center gap-1">
                    <label className="font-bold" htmlFor="id">
                        TMDB Id
                    </label>
                    <input
                        className="h-10 w-24 rounded-sm text-center focus:outline-none focus:outline-red-600"
                        {...register("id", { required: true })}
                    />
                    <input
                        className={
                            "mt-1 w-24 cursor-pointer rounded-md bg-red-600 p-1 font-bold text-white transition-all hover:bg-red-400 active:scale-95"
                        }
                        onClick={() => handleSearch(getValues("id"))}
                        type="button"
                        value="Find"
                    />
                    {errors.id?.type === "required" && <p>TMDB id is required</p>}
                </div>
                {children}

                <div className="mt-3 flex flex-col items-center gap-1">
                    <h2 className="font-bold">Premiere date</h2>
                    <Popover>
                        <PopoverTrigger asChild>
                            <ShadButton
                                variant={"outline"}
                                className={cn("w-[12rem] justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </ShadButton>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                fromDate={new Date()}
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                                initialFocus
                                showOutsideDays
                                fixedWeeks
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <input
                    disabled={!isSuccess || !date}
                    className="mt-3 w-24 cursor-pointer rounded-md bg-red-600 p-1 font-bold text-white transition-all hover:bg-red-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-400 disabled:active:scale-100"
                    type="submit"
                    value="Submit"
                />
            </form>
        </section>
    );
}
