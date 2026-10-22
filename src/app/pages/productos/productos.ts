import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  private productoService = inject(ProductoService);
  
  productos: Producto[] = [];
  productoActual: Producto = this.nuevoProducto();
  modoEdicion = false;

  ngOnInit(): void {
    this.cargarProductos();
  }

  nuevoProducto(): Producto {
    return { nombre: '', categoria: '', precio: 0, stock: 0, marca: '', codigo_barras: '' };
  }

  cargarProductos(): void {
    this.productoService.listar().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar los productos', err)
    });
  }

  guardar(): void {
    if (this.modoEdicion && this.productoActual.id) {
      this.productoService.actualizar(this.productoActual.id, this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.cancelar();
      });
    } else {
      this.productoService.crear(this.productoActual).subscribe(() => {
        this.cargarProductos();
        this.cancelar();
      });
    }
  }

  editar(producto: Producto): void {
    this.productoActual = { ...producto };
    this.modoEdicion = true;
  }

  eliminar(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe(() => this.cargarProductos());
    }
  }

  cancelar(): void {
    this.productoActual = this.nuevoProducto();
    this.modoEdicion = false;
  }
}