"use client";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import {
    Box,
    ButtonBase,
    FormHelperText,
    IconButton,
    Stack,
    TextFieldProps,
} from "@mui/material";
import { isNil } from "lodash";
import { ChangeEvent, DragEvent, useRef } from "react";

import Preview from "./Preview";
import colors from "@/utils/public/colors";
import Text from "@/components/ui/text/Text";
import Chip from "../Chip";
import { Extension } from "@/utils/constants/extensions";

export type Props = Pick<
    TextFieldProps,
    "label" | "placeholder" | "helperText" | "disabled" | "error" | "required"
> & {
    accept?: Extension[];
    disablePreview?: boolean;
} & (
        | {
              multiple?: false;
              value: File | null | undefined;
              onChange: (file: File | null) => void;
          }
        | {
              multiple: true;
              value: File[] | null | undefined;
              onChange: (files: File[] | null) => void;
          }
    );

const w = "100%";
const h = "80px";
const zIndex = 10;

const FileField = ({
    label,
    accept,
    placeholder,
    ...props
}: Props): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null || e.target.files.length === 0) {
            return;
        }

        if (props.multiple) {
            props.onChange([
                ...(props.value ?? []),
                ...Array.from(e.target.files),
            ]);
        } else {
            const file = e.target.files[0];

            if (file === undefined) {
                console.error("No file was found (2/2)");

                return;
            }

            props.onChange(file);
        }
    };

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation(); //Allows onDrop event to be registered
        e.preventDefault();
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.dataTransfer.files.length === 0) {
            return;
        }

        if (props.multiple) {
            props.onChange(Array.from(e.dataTransfer.files));
        } else {
            const file = e.dataTransfer.files[0];

            if (file === undefined) {
                console.error("No file was found (1/2)");

                return;
            }

            props.onChange(file);
        }
    };

    const clear = () => {
        if (inputRef.current !== null) {
            inputRef.current.value = "";
        }

        props.onChange(null);
    };

    const removeFile = (fileName: string) => {
        if (props.multiple && props.value) {
            const curFiles = props.value ?? [];

            const newFiles = curFiles.filter((f) => f.name !== fileName);

            if (newFiles.length === 0) {
                clear();
            } else {
                props.onChange(newFiles);
            }
        } else {
            clear();
        }
    };

    return (
        <>
            <Box
                position="relative"
                style={{ width: w, height: h }}
                sx={{
                    border: `1px solid ${colors.border}`,
                    "&:hover": {
                        border: `1px solid ${colors.border}`,
                    },
                    borderRadius: "4px",
                }}
                onDragOver={onDragOver}
                onDrop={onDrop}
            >
                {!isNil(props.value) && (
                    <Box className={"absolute flex justify-end w-full"}>
                        <Box className={"p-1"} zIndex={zIndex}>
                            <IconButton onClick={clear}>
                                <CancelRoundedIcon
                                    style={{ color: colors.text }}
                                    className="w-5 h-5"
                                />
                            </IconButton>
                        </Box>
                    </Box>
                )}
                <Box
                    padding={1}
                    className="absolute flex justify-center items-center inset-y-0 inset-x-0"
                >
                    <Stack justifyContent={"center"}>
                        {isNil(props.value) ? (
                            <Text type="neutral" textAlign={"center"}>
                                {label ?? placeholder ?? ""}
                            </Text>
                        ) : props.multiple ? (
                            <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                                {props.value.map((f) => {
                                    return (
                                        <Chip
                                            sx={{
                                                maxWidth: "100%",
                                            }}
                                            key={f.name}
                                            label={
                                                <Box
                                                    display="flex"
                                                    gap={1}
                                                    width="100%"
                                                    alignItems={"center"}
                                                    position={"relative"}
                                                    justifyContent={
                                                        "space-between"
                                                    }
                                                >
                                                    <Box
                                                        overflow="hidden"
                                                        textOverflow="ellipsis"
                                                    >
                                                        {f.name}
                                                    </Box>

                                                    <IconButton
                                                        onClick={() =>
                                                            removeFile(f.name)
                                                        }
                                                        sx={{
                                                            zIndex: zIndex + 1,
                                                        }}
                                                    >
                                                        <CancelRoundedIcon
                                                            style={{
                                                                color: colors.text,
                                                            }}
                                                            className="w-4 h-4"
                                                        />
                                                    </IconButton>
                                                </Box>
                                            }
                                        />
                                    );
                                })}
                            </Stack>
                        ) : (
                            <Text>{props.value.name}</Text>
                        )}

                        {props.helperText !== undefined && (
                            <FormHelperText
                                disabled={props.disabled}
                                error={props.error}
                                className="text-center"
                            >
                                {props.helperText}
                            </FormHelperText>
                        )}
                    </Stack>
                </Box>
                <ButtonBase
                    component="label"
                    className="overflow-hidden"
                    style={{ width: w, height: h }}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept ? accept.join(", ") : undefined}
                        hidden
                        onChange={handleChange}
                    />
                </ButtonBase>
            </Box>

            {props.disablePreview !== true && !isNil(props.value) && (
                <Preview
                    files={
                        Array.isArray(props.value) ? props.value : [props.value]
                    }
                    removeFile={removeFile}
                />
            )}
        </>
    );
};

export default FileField;
