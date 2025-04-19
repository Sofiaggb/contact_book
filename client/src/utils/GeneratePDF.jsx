import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (contacts) => {
    const doc = new jsPDF();
    
    // Encabezado
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFont("helvetica", "bold");
    doc.text("Lista de Contactos", 105, 15, { align: "center" });
    
    // Información general
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 25);
    doc.text(`Total contactos: ${contacts.length}`, 14, 30);
    
    // Preparamos los datos para la tabla
    const tableData = contacts.map((contact) => {
      return [
        contact.first_name || '-',
        contact.last_name || '-',
        contact.phone || '-',
        contact.email || '-',
        contact.role.name,
        contact.role.name === 'cliente' ? '-' : (contact.department?.name || '-'),
      ];
    });
  
    // Tabla con estilo mejorado
    autoTable(doc, {
      head: [["Nombre", "Apellido", "Teléfono", "Email", "Tipo","Departamento"]],
      body: tableData,
      startY: 35,
      headStyles: {
        fillColor: [128, 0, 128],  // morado (RGB: 128,0,128)
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      columnStyles: {
        0: { cellWidth: 25 },  // Nombre
        1: { cellWidth: 25 },  // Apellido
        2: { cellWidth: 30 },  // Teléfono
        3: { cellWidth: 40 },  // Email
        4: { cellWidth: 20 },  // Tipo
        5: { cellWidth: 35 }   // Departamento
      },
      styles: {
        fontSize: 9,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      didParseCell: function(data) {
        // Resaltar clientes con color diferente
        if (data.column.index === 4 && data.cell.raw === 'cliente') {
          data.cell.styles.fillColor = [255, 204, 153]; // Naranja claro
        }
      }
    });
    
    // Leyenda para clientes
    doc.setFillColor(255, 204, 153);
    doc.rect(14, doc.lastAutoTable.finalY + 10, 5, 5, 'F');
    doc.text('Contactos con rol de cliente', 22, doc.lastAutoTable.finalY + 13);
    
    // Pie de página
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, 105, 285, { align: "center" });
    }
    
    doc.save("contactos.pdf");
  };