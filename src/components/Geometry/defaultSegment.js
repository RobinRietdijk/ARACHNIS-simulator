import Axis from "./Axis";

const defaultSegment = {
    length: 10,
    axis: new Axis('x'),
    range: [0, 180],
    color: "#DD7805"
}

const defaultSegmentOptions = {
    color_menu: false
}

const createDefaultSegment = (id) => {
    const ds = { ...defaultSegment }
    ds["id"] = id;
    return ds;
}

const createDefaultSegmentOptions = () => {
    const ds = { ...defaultSegmentOptions }
    return ds;
}

export {
    defaultSegment,
    defaultSegmentOptions,
    createDefaultSegment,
    createDefaultSegmentOptions
}