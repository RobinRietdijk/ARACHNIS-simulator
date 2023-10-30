import Vector3D from "./Vector3D";

class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        const norm = Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
        this.w /= norm;
        this.x /= norm;
        this.y /= norm;
        this.z /= norm;
        return this;
    }

    conjugate() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    multiply(other) {
        const w = this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z;
        const x = this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y;
        const y = this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x;
        const z = this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w;
        return new Quaternion(w, x, y, z);
    }

    rotateVector(vector) {
        const p = new Quaternion(0, vector.x, vector.y, vector.z);
        const qConjugate = this.clone().conjugate();
        const rotated = this.multiply(p).multiply(qConjugate);
        return new Vector3D(rotated.x, rotated.y, rotated.z);
    }

    clone() {
        return new Quaternion(this.w, this.x, this.y, this.z);
    }
}

export default Quaternion