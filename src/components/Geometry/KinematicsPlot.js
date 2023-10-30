import Segment from "./Segment";

class KinematicsPlot {
    constructor(id, n_segments, segment_length, name="unnamed-plot", showLegend=true, opacity=1.0, color="#FF06B5") {
        this.id = id
        this.n_segments = n_segments;
        this.segment_length = segment_length;

        this.name = name;
        this.showLegend = showLegend;
        this.type = 'scatter3d';
        this.opacity = opacity;
        this.color = color;

        this.segments = [Segment.Root(0, 0, 0, this.segment_length)]
        for (let i = 1; i < this.n_segments; i++) {
            this.segments[i] = Segment.Child(this.segments[i - 1], this.segment_length);
        }
    }

    setSegments(n) { 
        this.n_segments = n;
    }
    setSegmentLength(l) {
        this.segment_length = l 
    }

    getPlot() {
        return [{
            name: this.name,
            showLegend: this.showLegend,
            type: this.type,
            opacity: this.opacity,
            color: this.color,
            x: this.segments.map(s => s.a.x),
            y: this.segments.map(s => s.a.y),
            z: this.segments.map(s => s.a.z),
        }]
    }
}

export default KinematicsPlot