import { useState } from "react";

export const useField = (type, name) => {
    const [value, setValue] = useState("");
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const resetField = () => {
        setValue("");
    };
    return { inputProps: { type, name, value, onChange }, resetField };
};
