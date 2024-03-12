import { useEffect, useState } from "react";
import { useKino } from "../../contexts/KinoProvider";
import { useNavigate } from "react-router-dom";

export default function KinoSelect() {
    const { kino, setKino } = useKino();
    const [kinoOptions, setKinoOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //TODO: get all kinos.
        //TODO
    }, [kino]);

    return (
        <>
            <select
                onChange={(e) => {
                    setKino(e.target.value);
                    navigate("/home", { replace: true });
                }}
            >
                <option>{kino}</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </>
    );
}
