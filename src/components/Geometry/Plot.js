class Plot {
    constructor(type, name="unnamed-plot", showLegend=true, opacity=1.0, color="#FF06B5", vertices=[]) {
        this.name = name;
        this.showLegend = showLegend;
        this.type = type;
        this.opacity = opacity;
        this.color = color;
        this.vertices = vertices;
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

export default Plot;