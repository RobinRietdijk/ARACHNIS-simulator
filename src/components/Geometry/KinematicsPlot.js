import Segment from "./Segment";
import Vector3D from "./Vector3D";

class KinematicsPlot {
    constructor(id, segment_lengths, segment_axes, name="unnamed-plot", showLegend=true, opacity=1.0, color="#FF06B5") {
        this.id = id
        this.n_segments = segment_lengths.length;
        this.segment_lengths = segment_lengths;
        this.segment_axes = segment_axes

        this.name = name;
        this.showLegend = showLegend;
        this.type = 'scatter3d';
        this.opacity = opacity;
        this.color = color;

        this.segments = []
        for (let i = 0; i < this.n_segments; i++) {
            this.segments.push(new Segment(this.segment_lengths[i], this.segment_axes[i]));
        }
    }

    calculateEndEffectorPosition() {
        let endEffectorPosition = new Vector3D(0, 0, 0);
        for (const segment of this.segments) {
            console.log(segment)
            endEffectorPosition = segment.getOrientationQuaternion().rotateVector(endEffectorPosition);
            endEffectorPosition = endEffectorPosition.add(new Vector3D(segment.length, 0, 0));
        }

        return endEffectorPosition;
    }

    getPlot() {
        const positions = [new Vector3D(0, 0, 0)];
        let endEffectorPosition = this.calculateEndEffectorPosition();

        const traceData = [];
        for (let i = 0; i < this.segments.length; i++) {
            endEffectorPosition = this.segments[i].getOrientationQuaternion().rotateVector(endEffectorPosition);
            const position = positions[positions.length - 1].clone().add(endEffectorPosition);
            positions.push(position);

            const x = positions.map((pos) => pos.x);
            const y = positions.map((pos) => pos.y);
            const z = positions.map((pos) => pos.z);
            const trace = {
                type: 'scatter3d',
                mode: 'lines+markers',
                x: x,
                y: y,
                z: z,
                marker: { size: 10, opacity: this.opacity },
                line: { width: 5, color: this.color },
                name: `Segment ${i + 1}`
            };
            traceData.push(trace);
        }

        const layout = {
            scene: {
                aspectmode: 'manual',
                aspectratio: { x: 1, y: 1, z: 1 }
            }
        };

        return {
            data: traceData,
            layout: layout
        }
    }
}

export default KinematicsPlot