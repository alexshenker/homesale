import { imgExtensions } from "@/utils/constants/extensions";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

interface Props {
    files: File[] | string[];
    removeFile?: (fileName: string) => void;
}

const Preview = (props: Props): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width: containerWidth = 0 } = useResizeObserver({
        ref: containerRef,
    });

    const [imgW, setImgW] = useState<number>(0);
    const [imgH, setImgH] = useState<number>(0);

    const aspectRatio = imgW / imgH;
    const newImageHeight = containerWidth / aspectRatio;

    const onlyImgFiles = useMemo(() => {
        return props.files.filter(
            (f) =>
                typeof f === "string" ||
                imgExtensions.some((ex) => f.type.endsWith(ex.replace(".", "")))
        );
    }, [props.files]);

    return (
        <div
            ref={containerRef}
            className="w-full relative"
            style={{ height: newImageHeight + "px" }}
        >
            {onlyImgFiles.map((f) => {
                return (
                    <div
                        key={typeof f === "string" ? f : f.name}
                        onClick={() => {
                            if (props.removeFile === undefined) {
                                return;
                            } else {
                                props.removeFile(
                                    typeof f === "string" ? f : f.name
                                );
                            }
                        }}
                    >
                        <Image
                            src={
                                typeof f === "string"
                                    ? f
                                    : URL.createObjectURL(f)
                            }
                            alt="Image Preview"
                            fill
                            onLoad={({ target }) => {
                                const { naturalWidth, naturalHeight } =
                                    target as HTMLImageElement;
                                setImgW(naturalWidth);
                                setImgH(naturalHeight);
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Preview;
