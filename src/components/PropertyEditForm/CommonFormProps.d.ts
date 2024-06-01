import { GetPropertyRes } from "@/lib/db/properties/getProperty";

export type CommonFormProps = {
    property: NonNullable<GetPropertyRes>;
} & (
    | {
          nextPage: () => void;
          prevPage: () => void;
      }
    | {
          nextPage?: undefined;
          prevPage: () => void;
      }
    | {
          nextPage: () => void;
          prevPage?: undefined;
      }
);
