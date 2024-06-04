import { SafeParseError } from "zod";

const handleParseError = <T extends unknown = unknown>(
    functionName: string,
    zodResponse: SafeParseError<T>
): never => {
    throw new Error(
        `[${functionName}]: Failed to parse: ${JSON.stringify(zodResponse.error.issues)}`
    );
};

export default handleParseError;
