import { toDegrees, toRadians } from "./util";

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
        console.log(radius)

        let angle = 0;
        while (angle <= 360) {
            let x_coordinate, y_coordinate;
            if (angle == 0) {
                x_coordinate = 0;
                y_coordinate = radius;
            }
            else if (0 < angle && angle <= 90) {
                x_coordinate = Math.cos(toRadians(90 - angle)) * radius;
                y_coordinate = Math.sin(toRadians(90 - angle)) * radius;
            }
            else if (90 < angle && angle <= 180) {
                x_coordinate = Math.cos(toRadians(angle - 90)) * radius;
                y_coordinate = Math.sin(toRadians(angle - 90)) * radius * -1;
            }
            else if (180 < angle && angle <= 270) {
                x_coordinate = Math.cos(toRadians(270 - angle)) * radius * -1;
                y_coordinate = Math.sin(toRadians(270 - angle)) * radius * -1;
            }
            else if (270 < angle && angle <= 360) {
                x_coordinate = Math.cos(toRadians(angle - 270)) * radius * -1;
                y_coordinate = Math.sin(toRadians(angle - 270))* radius;
            }
            else throw "Exception";

            this.coordinates.x.push(x_coordinate);
            this.coordinates.y.push(y_coordinate);
            this.coordinates.z.push(height);
            angle += toDegrees(a_angle);
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