import { Quaternion } from "three";
import { toRadians } from "./util";

class Vector3D {
    constructor(x, y, z, name = null) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
    }

    add(b) { 
        this.x += b.x;
        this.y += b.y;
        this.z += b.z;
        return this;
    }

    subtract(b) { 
        this.x -= b.x;
        this.y -= b.y;
        this.z -= b.z;
        return this;
    }

    multiplyScalar(d) { 
        this.x *= d;
        this.y *= d;
        this.z *= d;
        return this;
    }

    dot(v) { 
        return this.x * v.x + this.y * v.y + this.z * v.z; 
    }

    cross(b) {
        const x = this.y * b.z - this.z * b.y;
        const y = this.z * b.x - this.x * b.z;
        const z = this.x * b.y - this.y * b.x;
        return new Vector3D(x, y, z);
    }

    length() { 
        return Math.sqrt(this.x ** 2, this.y ** 2, this.z ** 2); 
    }

    normalize() { 
        const length = this.length();
        if (length === 0) {
            this.x /= length;
            this.y /= length;
            this.z /= length;
        }
        return this; 
    }

    applyQuaternion(q) {
        const rotatedQuaternion = q.multiply(new Quaternion(0, this.x, this.y, this.z)).multiply(q.conjugate());
        this.x = rotatedQuaternion.x;
        this.y = rotatedQuaternion.y;
        this.z = rotatedQuaternion.z;
        return this;
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
        return new Vector3D(this.x, this.y, this.z, this.name);
    }

    toString() {
        return `Vector3D(${this.x}, ${this.y}, ${this.z})`;
    }

    static fromSphericalCoordinates(r, a, e) {
        const x = r * Math.sin(e) * Math.cos(a);
        const y = r * Math.sin(e) * Math.sin(a);
        const z = r * Math.cos(e);
        return new Vector3D(x, y, z);
    }
}

export default Vector3D;