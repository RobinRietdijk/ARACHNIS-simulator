import Vector3D from "./Vector3D";

class Linkage extends Array {
    constructor() {
        super();
    }

    addSegment(segment) {
        this.push(segment)
    }

    rotateSegment(i, angle) {
        if (i >= 0 && i < this.length) {
            this[i].rotate(angle);
        } else {
            console.error("Invalid segment index");
        }
    }

    getEndEffectorPosition() {
        let endEffectorPosition = new Vector3D(0, 0, 0);
        for (const segment of this) {
            endEffectorPosition = segment.getEndPoint();
        }

        return endEffectorPosition;
    }
}

export default Linkage;