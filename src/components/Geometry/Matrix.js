class Matrix extends Array {
    constructor(rows, cols) {
        super(rows);
        for (let i = 0; i < rows; i++) {
            this[i] = new Array(cols).fill(0);
        }
        this.rows = rows;
        this.cols = cols;
    }

    static identity(size) {
        const matrix = new Matrix(size, size);
        for (let i = 0; i < size; i++) {
            matrix[i][i] = 1;
        }
        return matrix;
    }

    static add(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) {
            throw new Error("Matrix dimensions must match for addition");
        }

        const res = new Matrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                res[i][j] = a[i][j] + b[i][j];
            }
        }
        return res;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error("Matrix dimensions are incompatible for multiplication");
        }

        const res = new Matrix(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a[i][k] * b[k][j];
                }
                res[i][j] = sum;
            }
        }
        return res;
    }
}