async function urlToFile(srcUrl: string, fileName: string, type?: string) {
    const response = await fetch(srcUrl);

    const blob = await response.blob();

    return new File([blob], fileName, { type: type ?? blob.type });
}

export default urlToFile;
