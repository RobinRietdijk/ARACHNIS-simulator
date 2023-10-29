import Vector3D from "./Vector3D";

class KinematicsPlot {
    constructor(id, n_segments, segments_length, name="unnamed-plot", showLegend=true, opacity=1.0, color="#FF06B5") {
        this.id = id
        this.n_segments = n_segments;
        this.segments_length = segments_length;

        this.name = name;
        this.showLegend = showLegend;
        this.type = 'scatter3d';
        this.opacity = opacity;
        this.color = color;

        this.vertices = [];
        this.vertices[0] = new Vector3D(0, 0, 0)
        for (let i = 1; i <= this.n_segments; i++) {
            this.vertices[i] = new Vector3D(0, 0, segments_length * i);
        }
    }

    setSegments(n) { 
        if (this.n_segments !== n) this.n_segments = n 
    }
    setSegmentLength(l) {
        if (this.segments_length !== l) this.segments_length = l 
    }

    getPlot() {
        return {
            name: this.name,
            showLegend: this.showLegend,
            type: this.type,
            opacity: this.opacity,
            color: this.color,
            x: this.vertices.map(v => v.x),
            y: this.vertices.map(v => v.y),
            z: this.vertices.map(v => v.z),
        }
    }
}

export default KinematicsPlot