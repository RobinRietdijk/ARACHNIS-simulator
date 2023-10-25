import { toRadians } from "./util";

class Polygon {
    constructor(vertices, edge_length, height = 100) {
        this.coordinates = {
            x: [],
            y: [],
            z: [],
        };

        const a_angle = toRadians(360 / vertices);
        const b_angle = toRadians((180 - (360 / vertices)) / 2);
        const radius = edge_length * Math.sin(b_angle) / Math.sin(a_angle);

        let angle = 0;
        while (angle <= 2 * Math.PI) {
            const x_coordinate = Math.cos(angle) * radius;
            const y_coordinate = Math.sin(angle) * radius;

            this.coordinates.x.push(x_coordinate);
            this.coordinates.y.push(y_coordinate);
            this.coordinates.z.push(height);
            angle += a_angle;
        }
    }

    get3DMesh(name = "unnamed-mesh", opacity = 0.3, color = "#FF06B5") {
        return {
            name: name,
            showLegend: true,
            type: "mesh3d",
            opacity: opacity,
            color: color,
            x: this.coordinates.x,
            y: this.coordinates.y,
            z: this.coordinates.z,
        };
    }

    get3DScatter(name = "unnamed-scatter", opacity = 1.0, color = "#FF06B5") {
        return {
            name: name,
            showLegend: true,
            type: "scatter3d",
            opacity: opacity,
            color: color,
            x: this.coordinates.x,
            y: this.coordinates.y,
            z: this.coordinates.z,
        };
    }
}

export default Polygon;