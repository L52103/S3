import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

interface Producto {
  id: number;
  nombre: string;
  stock: number;
}

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Personal {
  id: number;
  nombre: string;
  cargo: string;
}

interface Venta {
  id: number;
  productoId: number;
  cantidad: number;
}

interface Compra {
  id: number;
  productoId: number;
  cantidad: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  tabIndex = 0;

  // Productos
  productos: Producto[] = [];
  nuevoProducto: Partial<Producto> = {};
  productoEditandoId: number | null = null;

  // Categorías
  categorias: Categoria[] = [];
  nuevaCategoria: Partial<Categoria> = {};
  categoriaEditandoId: number | null = null;

  // Personal
  personal: Personal[] = [];
  nuevoPersonal: Partial<Personal> = {};
  personalEditandoId: number | null = null;

  // PRODUCTOS
  agregarProducto() {
    if (!this.nuevoProducto.nombre || this.nuevoProducto.stock == null) return;
    this.productos.push({
      id: Date.now(),
      nombre: this.nuevoProducto.nombre,
      stock: this.nuevoProducto.stock,
    });
    this.nuevoProducto = {};
  }

  editarProducto(producto: Producto) {
    this.productoEditandoId = producto.id;
    this.nuevoProducto = { ...producto };
  }

  guardarProducto() {
    const index = this.productos.findIndex(p => p.id === this.productoEditandoId);
    if (index !== -1 && this.nuevoProducto.nombre && this.nuevoProducto.stock != null) {
      this.productos[index] = {
        id: this.productoEditandoId!,
        nombre: this.nuevoProducto.nombre,
        stock: this.nuevoProducto.stock,
      };
    }
    this.productoEditandoId = null;
    this.nuevoProducto = {};
  }

  cancelarEdicionProducto() {
    this.productoEditandoId = null;
    this.nuevoProducto = {};
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  // CATEGORÍAS
  agregarCategoria() {
    if (!this.nuevaCategoria.nombre || !this.nuevaCategoria.descripcion) return;
    this.categorias.push({
      id: Date.now(),
      nombre: this.nuevaCategoria.nombre,
      descripcion: this.nuevaCategoria.descripcion,
    });
    this.nuevaCategoria = {};
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaEditandoId = categoria.id;
    this.nuevaCategoria = { ...categoria };
  }

  guardarCategoria() {
    const index = this.categorias.findIndex(c => c.id === this.categoriaEditandoId);
    if (index !== -1 && this.nuevaCategoria.nombre && this.nuevaCategoria.descripcion) {
      this.categorias[index] = {
        id: this.categoriaEditandoId!,
        nombre: this.nuevaCategoria.nombre,
        descripcion: this.nuevaCategoria.descripcion,
      };
    }
    this.categoriaEditandoId = null;
    this.nuevaCategoria = {};
  }

  cancelarEdicionCategoria() {
    this.categoriaEditandoId = null;
    this.nuevaCategoria = {};
  }

  eliminarCategoria(id: number) {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }

  // PERSONAL
  agregarPersonal() {
    if (!this.nuevoPersonal.nombre || !this.nuevoPersonal.cargo) return;
    this.personal.push({
      id: Date.now(),
      nombre: this.nuevoPersonal.nombre,
      cargo: this.nuevoPersonal.cargo,
    });
    this.nuevoPersonal = {};
  }

  editarPersonal(p: Personal) {
    this.personalEditandoId = p.id;
    this.nuevoPersonal = { ...p };
  }

  guardarPersonal() {
    const index = this.personal.findIndex(p => p.id === this.personalEditandoId);
    if (index !== -1 && this.nuevoPersonal.nombre && this.nuevoPersonal.cargo) {
      this.personal[index] = {
        id: this.personalEditandoId!,
        nombre: this.nuevoPersonal.nombre,
        cargo: this.nuevoPersonal.cargo,
      };
    }
    this.personalEditandoId = null;
    this.nuevoPersonal = {};
  }

  cancelarEdicionPersonal() {
    this.personalEditandoId = null;
    this.nuevoPersonal = {};
  }

  eliminarPersonal(id: number) {
    this.personal = this.personal.filter(p => p.id !== id);
  }

  // BASE DE DATOS SIMULADA
  mostrarBaseDeDatos() {
    console.log('🔎 PRODUCTOS:', this.productos);
    console.log('📂 CATEGORÍAS:', this.categorias);
    console.log('👥 PERSONAL:', this.personal);
    alert('Datos mostrados en consola (F12)');
  }

   ventas: Venta[] = [];
  compras: Compra[] = [];

  ventaSeleccion: Partial<Venta> = {};
  compraSeleccion: Partial<Compra> = {};

  // Registrar venta y descontar stock
  registrarVenta() {
    if (!this.ventaSeleccion.productoId || !this.ventaSeleccion.cantidad) return;

    const producto = this.productos.find(p => p.id === this.ventaSeleccion.productoId);
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    if (producto.stock < this.ventaSeleccion.cantidad!) {
      alert('Stock insuficiente para esta venta');
      return;
    }

    // Actualizar stock
    producto.stock -= this.ventaSeleccion.cantidad!;

    this.ventas.push({
      id: Date.now(),
      productoId: this.ventaSeleccion.productoId,
      cantidad: this.ventaSeleccion.cantidad!,
    });

    this.ventaSeleccion = {};
  }

  // Registrar compra y aumentar stock
  registrarCompra() {
    if (!this.compraSeleccion.productoId || !this.compraSeleccion.cantidad) return;

    const producto = this.productos.find(p => p.id === this.compraSeleccion.productoId);
    if (!producto) {
      alert('Producto no encontrado');
      return;
    }

    // Actualizar stock
    producto.stock += this.compraSeleccion.cantidad!;

    this.compras.push({
      id: Date.now(),
      productoId: this.compraSeleccion.productoId,
      cantidad: this.compraSeleccion.cantidad!,
    });

    this.compraSeleccion = {};
  }

  // Obtener nombre producto por id
  obtenerNombreProducto(productoId: number): string {
    const producto = this.productos.find(p => p.id === productoId);
    return producto ? producto.nombre : 'Producto no encontrado';
  }
  seccionActiva: string | null = null;

}

