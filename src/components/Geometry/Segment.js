import Vector3D from "./Vector3D";

class Segment {
    constructor(a, parent, len) {
        this.a = a;
        this.parent = parent;
        this.len = len;
        this.b = new Vector3D(this.a.x, this.a.y, this.a.z + this.len);
    }

    static Root(x, y, z, len) {
        return new Segment(new Vector3D(x, y, z), null, len);
    }

    static Child(parent, len) {
        return new Segment(parent.b, parent, len);
    }
}