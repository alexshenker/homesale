import { Box } from "@mui/material";
import Text from "../text/Text";
import useTranslate from "@/utils/public/hooks/useTranslate";
import { ColsToShow } from "./Table";

interface Props<ColName extends string> {
  columns: readonly ColName[];
  columnsToShow: ColsToShow<ColName>;
  setColumnsToShow: (cols: ColsToShow<ColName>) => void;
}

const ToggleColumns = <ColName extends string>(
  props: Props<ColName>,
): JSX.Element => {
  const t = useTranslate();

  return (
    <Box padding={2}>
      {props.columns.map((col) => {
        const on = props.columnsToShow[col];
        return (
          <Box
            component="button"
            key={col}
            display="flex"
            gap={1}
            onClick={() => {
              props.setColumnsToShow({
                ...props.columnsToShow,
                [col]: !on,
              });
            }}
          >
            <Text>{col}:</Text>
            {on ? (
              <Text type="success">{t("On").toUpperCase()}</Text>
            ) : (
              <Text type="error">{t("Off").toUpperCase()}</Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default ToggleColumns;
