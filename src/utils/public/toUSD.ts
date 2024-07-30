const toUSD = (n: number, maxDec: number = 2) => {
    return n.toLocaleString("en-US", {
        maximumFractionDigits: maxDec,
        style: "currency",
        currency: "USD",
    });
};

export default toUSD;
