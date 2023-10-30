import Vector3D from "./Vector3D";

class Segment {
    constructor(x, y, z, parent, len = 10, axis = "x", angle = 90, min_angle = 0, max_angle = 180) {
        this.pivot = new Vector3D(x, y, z);
        this.len = len;

        this.parent = parent;
        this.root = (this.parent === null);

        this.axis = axis;
        if (this.axis === "x") {
            this.r_matrix = [[]];
            this.dir_v = new Vector3D(1, 0, 0);
        } else if (this.axis === "y") {
            this.r_matrix = [[]];
            this.dir_v = new Vector3D(0, 1, 0);
        } else if (this.axis === "z") {
            this.r_matrix = [[]];
            this.dir_v = new Vector3D(0, 0, 1);
        } else {
            throw 'Error';
        }
        this.angle = angle;
        this.min_angle = min_angle;
        this.max_angle = max_angle;

        this.endPoint = this.dir_v.multiply(new Vector3D(this.len, this.len, this.len))
    }
}

export default Segment;