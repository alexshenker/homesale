"use client";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { KeyboardEvent } from "react";
import TextField from "./fields/TextField";

interface Props {
    searchTerm: string | null | undefined;
    onSearch?: () => void;
    onChange: (newTerm: string) => void;
    placeholder?: string;
}

const SearchBar = (props: Props): JSX.Element => {
    const onEnter = (e: KeyboardEvent<HTMLDivElement>) => {
        if (props.onSearch === undefined) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            props.onSearch();
        }
    };

    return (
        <TextField
            value={props.searchTerm ?? ""}
            placeholder={props.placeholder ?? "Search..."}
            onKeyDown={props.onSearch === undefined ? undefined : onEnter}
            onChange={(e) => props.onChange(e.target.value)}
            type="search"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon
                            className="cursor-pointer"
                            onClick={props.onSearch}
                        />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchBar;
