


class Producto {

    constructor(sku, descripcion, cantidad) {

        this.sku = sku;
        this.descripcion = descripcion;
        this.cantidad = cantidad;

    }

    getSku() {
        return this.sku;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getCantidad() {
        return this.cantidad;
    }

    getProducto() {

        return "El producto código" + this.sku + " - " + this.descripcion + " ... tiene: |" + this.cantidad + "| unidades en stock";
    }

    setSku(nuevoSku) {
        this.sku = nuevoSku;
    }

    setDescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    setCantidad(nuevaCantidad) {
        this.cantidad = nuevaCantidad;
    }


}

