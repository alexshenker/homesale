import colors from "@/utils/public/colors";
import { FC, PropsWithChildren } from "react";

interface Props {
    on: boolean;
}

const Tab: FC<PropsWithChildren<Props>> = (props) => {
    return (
        <div
            style={{
                ...(props.on && { borderBottom: `1px solid ${colors.border}` }),
            }}
        >
            {props.children}
        </div>
    );
};

export default Tab;
