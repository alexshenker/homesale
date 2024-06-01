const exhaustiveSwitch = (v: never): never => {
    throw new Error(`Unexpected value received:`, v);
};

export default exhaustiveSwitch;
