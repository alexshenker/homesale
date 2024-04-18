import company from "@/utils/constants/company";
import colors from "@/utils/public/colors";
import { format } from "date-fns";
import Text from "./ui/text/Text";
import { useMemo } from "react";

const Footer = (): JSX.Element => {
    const year = useMemo(() => {
        return format(new Date(), "yyyy");
    }, []);

    return (
        <footer
            style={{ backgroundColor: colors.backgroundBrand }}
            className="p-2 text-center"
        >
            <Text variant="caption" overlay>
                &copy; {company} {year}
            </Text>
        </footer>
    );
};

export default Footer;
