"use client";

import Link, { LinkProps } from "next/link";
import { FC, useMemo } from "react";
import Text, { Props as TextProps } from "../Text";

type Props = TextProps &
  (
    | {
        href: LinkProps["href"];
        onClick?: undefined;
      }
    | {
        href?: undefined;
        onClick: () => void;
      }
  );

const LinkText: FC<React.PropsWithChildren<Props>> = ({ href, ...props }) => {
  const TextStyled = useMemo(() => {
    return (
      <Text
        {...props}
        sx={{
          fontWeight: 100,
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
          ...props.sx,
        }}
      >
        {props.children}
      </Text>
    );
  }, [props]);

  if (href !== undefined) {
    return <Link href={href}>{TextStyled}</Link>;
  }

  return <>{TextStyled}</>;
};

export default LinkText;
