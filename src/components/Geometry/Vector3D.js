class Vector3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    getUnitVector() { return this.scale(1 / this.length()); }
    length() { return Math.sqrt(this.dot(this)); }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    multiply(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }

    divide(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
    }

    transform(tx, ty, tz) {
        return this.add(new Vector3D(tx, ty, tz));
    }

    scale(sx, sy, sz) {
        return this.multiply(new Vector3D(sx, sy, sz));
    }

    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    getTo(v) { return new Vector3D(v.x - this.x, v.y - this.y, v.z, this.z) }
}

export default Vector3D;