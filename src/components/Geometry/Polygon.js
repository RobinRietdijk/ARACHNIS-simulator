import { toRadians } from "./util";
import Vector from "./Vector";

class Polygon {
    constructor(vertices, edge_length, height = 0) {
        this.vertices = [];

        const a_angle = toRadians(360 / vertices);
        const b_angle = toRadians((180 - (360 / vertices)) / 2);
        const radius = edge_length * Math.sin(b_angle) / Math.sin(a_angle);

        let angle = 0;
        while (angle <= 2 * Math.PI) {
            const x_coordinate = Math.cos(angle) * radius;
            const y_coordinate = Math.sin(angle) * radius;

            this.vertices.push(new Vector(x_coordinate, y_coordinate, height));
            angle += a_angle;
        }
    }

    transform(x_transform = 0, y_transform = 0, z_transform = 0) {
        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.vertices[i].add(new Vector(x_transform, y_transform, z_transform));
        }
    }

    scale(x_scale = 1, y_scale = 1, z_scale = 1) {
        for (let i = 0; i < this.vertices.length - 1; i++) {
            this.vertices[i].dot(new Vector(x_scale, y_scale, z_scale));
        }
    }

    get3DMesh(name = "unnamed-mesh", opacity = 0.3, color = "#FF06B5") {
        const x = [];
        const y = [];
        const z = [];
        for (let i = 0; i < this.vertices.length - 1; i++) {
            x.push(this.vertices[i].x);
            y.push(this.vertices[i].y);
            z.push(this.vertices[i].z);
        }

        return {
            name: name,
            showLegend: true,
            type: "mesh3d",
            opacity: opacity,
            color: color,
            x: x,
            y: y,
            z: z,
        };
    }

    get3DScatter(name = "unnamed-scatter", opacity = 1.0, color = "#FF06B5") {
        const x = [];
        const y = [];
        const z = [];
        for (let i = 0; i < this.vertices.length - 1; i++) {
            x.push(this.vertices[i].x);
            y.push(this.vertices[i].y);
            z.push(this.vertices[i].z);
        }
        
        return {
            name: name,
            showLegend: true,
            type: "scatter3d",
            opacity: opacity,
            color: color,
            x: x,
            y: y,
            z: z,
        };
    }
}

export default Polygon;