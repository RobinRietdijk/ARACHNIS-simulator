class Quaternion {
    constructor(w = 1, x = 0, y = 0, z = 0) {
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    normalize() {
        const length = Math.sqrt(this.w ** 2 + this.x ** 2 + this.y ** 2 + this.z ** 2);
        return new Quaternion(this.w / length, this.x / length, this.y / length, this.z / length);
    }

    conjugate() {
        return new Quaternion(this.w, -this.x, -this.y, -this.z);
    }

    multiply(other) {
        const w = this.w * other.w - this.x * other.x - this.y * other.y - this.z * other.z;
        const x = this.w * other.x + this.x * other.w + this.y * other.z - this.z * other.y;
        const y = this.w * other.y - this.x * other.z + this.y * other.w + this.z * other.x;
        const z = this.w * other.z + this.x * other.y - this.y * other.x + this.z * other.w;
        return new Quaternion(w, x, y, z);
    }

    clone() {
        return new Quaternion(this.w, this.x, this.y, this.z);
    }

    static fromAxisAngle(axis, angle) {
        const halfAngle = angle / 2;
        const sinHalfAngle = Math.sin(halfAngle);
        const cosHalfAngle = Math.cos(halfAngle);
        const x = axis.x * sinHalfAngle;
        const y = axis.y * sinHalfAngle;
        const z = axis.z * sinHalfAngle;
        const w = cosHalfAngle;
        return new Quaternion(w, x, y, z);
    }
}

export default Quaternion