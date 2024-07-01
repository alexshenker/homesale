async function urlToFile(srcUrl: string, fileName: string, type?: string) {
    const cacheBust = `t=${new Date().getTime()}`;

    const response = await fetch(`${srcUrl}?${cacheBust}`);

    const blob = await response.blob();

    return new File([blob], fileName, { type: type ?? blob.type });
}

export default urlToFile;
