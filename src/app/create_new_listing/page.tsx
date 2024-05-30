"use client";

import TextField, {
    textFieldBorderRadius,
} from "@/components/fields/TextField";
import Space from "@/components/ui/Space";
import Text from "@/components/ui/text/Text";
import searchAddress, {
    MapboxResponse,
} from "@/lib/searchAddress/searchAddress";
import { formProps } from "@/utils/constants/formProps";
import colors from "@/utils/public/colors";
import {
    Box,
    ClickAwayListener,
    Stack,
    outlinedInputClasses,
    stackClasses,
    typographyClasses,
} from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

const CreateNewListing = (props: Props): JSX.Element => {
    const methods = useForm({
        ...formProps,
    });

    const [addressSelected, setAddressSelected] = useState(false);

    const [address, setAddress] = useState("");

    const [places, setPlaces] = useState<MapboxResponse | null>(null);

    const onAddressChange = useCallback(
        debounce((newAddress: string) => {
            searchAddress(newAddress).then((newPlaces) => {
                setPlaces(newPlaces);
            });
        }, 300),
        []
    );

    useEffect(() => {
        if (address.length < 2) {
            return;
        }

        if (addressSelected) {
            return;
        }

        onAddressChange(address);
    }, [address, addressSelected, onAddressChange]);

    return (
        <div>
            <Space />
            <ClickAwayListener
                onClickAway={() => {
                    setPlaces(null); //closes the 'dropdown'
                }}
            >
                <Box
                    position={"relative"}
                    width="100%"
                    maxWidth={"350px"}
                    minWidth="180px"
                >
                    <TextField
                        value={address}
                        onChange={(e) => {
                            setAddressSelected(false);
                            setAddress(e.target.value);
                        }}
                        placeholder="Search address..."
                        sx={
                            places === null
                                ? {}
                                : {
                                      [`& .${outlinedInputClasses.root}`]: {
                                          borderEndEndRadius: "0px",
                                          borderEndStartRadius: "0px",
                                          borderBottom: "none",
                                      },
                                      [`& .${outlinedInputClasses.input}`]: {
                                          borderEndEndRadius: "0px",
                                          borderEndStartRadius: "0px",
                                      },
                                  }
                        }
                    />
                    {places !== null && (
                        <Stack
                            position={"absolute"}
                            width="100%"
                            sx={{
                                [`&.${stackClasses.root}`]: {
                                    backgroundColor: colors.background,
                                    borderLeft: `1px solid ${colors.border}`,
                                    borderRight: `1px solid ${colors.border}`,
                                    borderBottom: `1px solid ${colors.border}`,
                                    borderEndEndRadius: textFieldBorderRadius,
                                    borderEndStartRadius: textFieldBorderRadius,
                                },
                            }}
                        >
                            {places.features.map((place, idx) => {
                                const isLastItem =
                                    idx === places.features.length - 1;
                                return (
                                    <Box
                                        key={place.id}
                                        paddingX={2}
                                        paddingY={0.5}
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: colors.surface,
                                            },
                                            ...(isLastItem
                                                ? {
                                                      borderEndEndRadius:
                                                          textFieldBorderRadius,
                                                      borderEndStartRadius:
                                                          textFieldBorderRadius,
                                                  }
                                                : {}),
                                        }}
                                    >
                                        <Text
                                            onClick={() => {
                                                setAddress(
                                                    place.properties.full_address.replace(
                                                        ", United States",
                                                        ""
                                                    )
                                                );
                                                setAddressSelected(true);
                                                setPlaces(null);
                                            }}
                                            whiteSpace={"nowrap"}
                                            textOverflow={"ellipsis"}
                                            overflow={"hidden"}
                                            sx={{
                                                [`&.${typographyClasses.root}`]:
                                                    {
                                                        width: "auto",
                                                    },
                                            }}
                                        >
                                            {place.properties.full_address.replace(
                                                ", United States",
                                                ""
                                            )}
                                        </Text>
                                    </Box>
                                );
                            })}
                        </Stack>
                    )}
                </Box>
            </ClickAwayListener>
            {/* <FormProvider {...methods}></FormProvider> */}
        </div>
    );
};

export default CreateNewListing;
