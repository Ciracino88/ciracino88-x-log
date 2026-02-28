import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import style from "./autocompleteField.module.css"

interface AutocompleteProps {
    options: string[];
    value?: string | null;
    placeholder?: string;
    onChange?: (event: React.SyntheticEvent, value: string | null) => void;
}

export default function AutocompleteField({
    options,
    placeholder = "이름을 입력하세요",
    value,
    onChange
}: AutocompleteProps) {
    
    return(
        <div className={style.container}>
            <Autocomplete
                fullWidth
                options={options}
                value={value ?? null}
                onChange={onChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""
                        placeholder={placeholder}
                        variant="outlined"
                    />
                )}
            />
        </div>
    )
}