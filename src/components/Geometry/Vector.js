class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scale(d) {
        this.x = d * this.x
        this.y = d * this.y
        this.z = d * this.z
    }

    add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        this.z = this.z + v.z;
    }

    getTo(v) {
        return new Vector(v.x - this.x, v.y - this.y, v.z, this.z)
    }

    getUnitVector() {
        return this.scale(1 / this.length());
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    length() {
        return Math.sqrt(this.dot(this));
    }
}

export default Vector;