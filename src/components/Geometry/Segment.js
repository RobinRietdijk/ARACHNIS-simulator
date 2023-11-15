import Quaternion from "./Quaternion";
import { defaultSegment } from "./defaultSegment";
class Segment {
    constructor(id, origin, axis=defaultSegment.axis, length=defaultSegment.length, range=defaultSegment.range, color=defaultSegment.color) {
        this.id = id;
        this.origin = origin;
        this.axis = axis.normalize();
        this.length = length;
        this.range = range;
        this.angle = 0;
        this.color = color
        this.rQuaternion = new Quaternion();
    }

    rotate(a) {
        this.angle += a;
        this.angle = Math.max(this.range[0], Math.min(this.range[1], this.angle));
        const rotation = Quaternion.fromAxisAngle(this.axis, this.angle);
        this.rQuaternion = this.rQuaternion.multiply(rotation);
    }

    getEndPoint() {
        const rotatedAxis = this.axis.clone().applyQuaternion(this.rQuaternion).normalize();
        const scaledAxis = rotatedAxis.clone().multiplyScalar(this.length);
        return this.origin.clone().add(scaledAxis);
    }
}

export default Segment;