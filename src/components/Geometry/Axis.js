import Vector3D from "./Vector3D";

class Axis extends Vector3D {
    constructor(name) {
        if (name === 'x') {
            super(1, 0, 0);
        } else if (name === 'y') {
            super(0, 1, 0)
        } else if (name === 'z') {
            super(0, 0, 1)
        } else {
            throw new Error(`Unknown axis: ${name}`);
        }
        this.name = name
    }
}

export default Axis;