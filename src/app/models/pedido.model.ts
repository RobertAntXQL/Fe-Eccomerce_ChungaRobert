export interface PedidoItem {
productoId: number;
cantidad: number;
}
export interface Pedido {
id?: number;
cliente: string;
items: PedidoItem[];
}