import { Stack } from "@mui/material";
import TextArea from "./TextArea";
import Button from "../ui/button/Button";
import Text from "../ui/text/Text";

export const allowedHtmlTags = [
  "h6",
  "p",
  "span",
  "strong",
  "u", //underline
  "a",
  "ol",
  "ul",
  "li",
  "article",
] as const;
export const allowedSelfClosingTags = ["br", "hr"] as const;

type AllowedHTMLTags = (typeof allowedHtmlTags)[number];
type SelfClosingTags = (typeof allowedSelfClosingTags)[number];

type AllowedTags = AllowedHTMLTags | SelfClosingTags;

const tagNameToRender: Record<AllowedTags, string> = {
  h6: "<h6></h6>",
  p: "\n<p></p>",
  span: "<span></span>",
  strong: "<strong></strong>",
  u: "<u></u>",
  a: '<a href=""></a>',
  ol: "\n<ol></ol>",
  ul: "\n<ul></ul>",
  li: "\n<li></li>",
  article: "\n<article></article>",
  br: "\n<br />",
  hr: "\n<hr />",
};

interface Props {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}

const HTMLEditor = (props: Props): JSX.Element => {
  return (
    <div>
      <Stack direction={"row"} flexWrap={"wrap"}>
        {allowedHtmlTags.map((t) => {
          return (
            <Button
              key={t}
              onClick={() => {
                props.onChange(props.value + tagNameToRender[t]);
              }}
              style={{ padding: "5px" }}
            >
              <Text>{`<${t}>`}</Text>
            </Button>
          );
        })}
      </Stack>

      <Stack direction={"row"} flexWrap={"wrap"}>
        {allowedSelfClosingTags.map((t) => {
          return (
            <Button
              key={t}
              onClick={() => {
                props.onChange(props.value + tagNameToRender[t]);
              }}
              style={{ padding: "5px" }}
            >
              <Text>{`<${t}>`}</Text>
            </Button>
          );
        })}
      </Stack>
      <TextArea
        label={props.label}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        minRows={5}
      />
    </div>
  );
};

export default HTMLEditor;
