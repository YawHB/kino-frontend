type Props = {
    date: string;
};



export default function ScreeningDate({ date }: Props) {



    return (
        <>
            <div className="flex flex-col gap-2">
                <h2>{date}</h2>
                <div className="bg-green-500">
                    <h3>21:30</h3>
                </div>
                <div className="bg-green-500">
                    <h3>21:30</h3>
                </div>
                <div className="bg-green-500">
                    <h3>21:30</h3>
                </div>
                <div className="bg-green-500">
                    <h3>21:30</h3>
                </div>
            </div>
        </>
    );
}
