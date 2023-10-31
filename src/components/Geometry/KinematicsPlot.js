import Linkage from "./Linkage";
import Segment from "./Segment";
import Vector3D from "./Vector3D";

class KinematicsPlot {
    constructor(id, n) {
        this.id = id;
        this.n_segments = n;

        this.linkage = new Linkage();
        this.initLinkage();
    }

    initLinkage() {
        for (let i = 0; i < this.n_segments; i++) {
            const origin = i === 0 ? new Vector3D(1, 0, 0) : this.linkage[i - 1].getEndPoint();
            const axis = new Vector3D(1, 0, 0);
            const length = 10;
            const range = [0, 180]
            const segment = new Segment(i, origin, axis, length, range);
            this.linkage.addSegment(segment);
        }
    }

    setSegmentLength(i, l) {
        if (i >= 0 && i < this.linkage.length) {
          this.linkage[i].length = l;
        } else {
          console.error("Invalid segment index");
        }
      }
    
      setSegmentAxis(i, a) {
        if (i >= 0 && i < this.linkage.length) {
          this.linkage[i].axis = a;
        } else {
          console.error("Invalid segment index");
        }
      }
    
      setSegmentMinAngle(i, a) {
        if (i >= 0 && i < this.linkage.length) {
          this.linkage[i].range[0] = a;
        } else {
          console.error("Invalid segment index");
        }
      }
    
      setSegmentMaxAngle(i, a) {
        if (i >= 0 && i < this.linkage.length) {
          this.linkage[i].range[1] = a;
        } else {
          console.error("Invalid segment index");
        }
      }

    rotateSegment(i, a) {
        this.linkage.rotateSegment(i , a);
    }

    getEndEffectorPosition() {
        return this.linkage.getEndEffectorPosition()
    }

    getPlot() {
        const traces = [];
        for (let i = 0; i < this.linkage.length; i++) {
            const segment = this.linkage[i];
            const endPoint = segment.getEndPoint();
            const startPoint = i ===0 ? new Vector3D(0, 0, 0) : this.linkage[i - 1].getEndPoint();

            const trace = {
                type: 'scatter3d',
                x: [startPoint.x, endPoint.x],
                y: [startPoint.y, endPoint.y],
                z: [startPoint.z, endPoint.z],
                mode: 'lines+markers',
                line: {
                    width: 5,
                },
                marker: {
                    size: 5,
                },
                name: `Segment ${i + 1}`,
            };

            traces.push(trace);
        }

        return traces;
    }
}

export default KinematicsPlot