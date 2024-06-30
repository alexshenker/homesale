import { SafeParseError } from "zod";

const handleParseError = <T extends unknown = unknown>(
    functionOrName: string | Function,
    zodResponse: SafeParseError<T>
): never => {
    throw new Error(
        `[${typeof functionOrName === "string" ? functionOrName : functionOrName.name}]: Failed to parse: ${JSON.stringify(zodResponse.error.issues)}`
    );
};

export default handleParseError;
