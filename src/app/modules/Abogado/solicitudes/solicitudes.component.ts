import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DocumentService, Documento } from './document.service';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [ CommonModule, HttpClientModule, SafeUrlPipe ],
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudComponent implements OnInit {
  documentos: Documento[] = [];
  showPreview = false;
  previewUrl: string | null = null;

  constructor(private docService: DocumentService) {}

  ngOnInit() {
    this.loadDocs();
  }

  loadDocs() {
    this.docService.getDocuments().subscribe(lista => {
      this.documentos = lista;
    });
  }

  preview(doc: Documento) {
    this.previewUrl = doc.download_url;
    this.showPreview = true;
  }

  closePreview() {
    this.showPreview = false;
    this.previewUrl = null;
  }

  changeEstado(doc: Documento, nuevo: 'aprobado' | 'rechazado') {
    this.docService.updateEstado(doc.id, nuevo).subscribe({
      next: () => doc.estado = nuevo,
      error: () => alert('Error al actualizar estado')
    });
  }
}
