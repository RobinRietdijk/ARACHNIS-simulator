import Axis from "./Axis";

const defaultSegment = {
    len: 10,
    axis: new Axis('x'),
    range: [0, 180],
    color: "#ffffff"
}

const createDefaultSegment = (id) => {
    const ds = { ...defaultSegment }
    ds["id"] = id;
    return ds;
}

export {
    defaultSegment,
    createDefaultSegment
}