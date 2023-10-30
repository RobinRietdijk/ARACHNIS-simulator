import { toRadians } from "./util";

class Vector3D {
    constructor(x, y, z, name = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
    }


    add(b) { return new Vector3D(this.x + b.x, this.y + b.y, this.z + b.z); }
    subtract(b) { return new Vector3D(this.x - b.x, this.y - b.y, this.z - b.z); }
    multiply(d) { return new Vector3D(this.x * d, this.y * d, this.z * d); }
    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    cross(b) {
        const x = this.y * b.z - this.z * b.y;
        const y = this.z * b.x - this.x * b.z;
        const z = this.x * b.y - this.y * b.x;
        return new Vector3D(x, y, z);
    }

    length() { return Math.sqrt(this.dot(this)); }
    getUnitVector() { 
        const length = this.length();
        if (length === 0) {
            return new Vector3D(0, 0, 0);
        }
        return this.multiply(1 / this.length()); 
    }

    rotateX(d) {
        const radians = toRadians(d);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const y = this.y * cos - this.z * sin;
        const z = this.y * sin + this.z * cos;
        return new Vector3D(this.x, y, z);
    }
    rotateY(d) {
        const radians = toRadians(d);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const x = this.x * cos + this.z * sin;
        const z = -this.x * sin + this.z * cos;
        return new Vector3D(x, this.y, z);

    }
    rotateZ(d) {
        const radians = toRadians(d);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        return new Vector3D(x, y, this.z);

    }

    getTo(v) { return new Vector3D(v.x - this.x, v.y - this.y, v.z, this.z); }
    skew() {
        return [
            [0, -this.z, this.y],
            [this.z, 0, -this.x],
            [-this.y, this.x, 0],
        ]
    }

    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }
}

export default Vector3D;