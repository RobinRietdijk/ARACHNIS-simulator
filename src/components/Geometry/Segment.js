import Quaternion from "./Quaternion";
import Vector3D from "./Vector3D";
import { toRadians } from "./util";

class Segment {
    constructor(length, axis, angle = 0, min_angle = 0, max_angle = 180) {
        this.length = length;
        this.axis = axis.getUnitVector();
        this.angle = angle;
        this.min_angle = min_angle;
        this.max_angle = max_angle;
    }

    setAngle(a) {
        if (a < this.min_angle) {
            this.angle = this.min_angle;
        } else if (a > this.max_angle) {
            this.angle = this.max_angle;
        } else {
            this.angle = a;
        }
    }

    getOrientationQuaternion() {
        const radians = toRadians(this.angle);
        const halfAngle = radians / 2;
        const s = Math.sin(halfAngle);
        const c = Math.cos(halfAngle);

        const x = this.axis.x * s;
        const y = this.axis.y * s;
        const z = this.axis.z * s;
        const w = c;

        return new Quaternion(x, y, z, w);
    }

    calculateEndEffectorPosition() {
        const orientation = this.getOrientationQuaternion();
        const relativePosition = new Vector3D(this.length, 0, 0);
        const rotatedPosition = orientation.rotateVector(relativePosition);
        return rotatedPosition;
    }
}

export default Segment;