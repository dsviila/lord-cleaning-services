import { business } from "@/mocks/landing";
import { buildTerms, clientRows, formatDate, serviceRows, type AgreementData, type ClientInfo } from "./data";

type SignedInfo = {
  signatureDataUrl: string;
  signedAt: Date;
};

/** Builds the signed agreement PDF and triggers the download. jsPDF is loaded only when needed. */
export async function downloadAgreementPdf(data: AgreementData, client: ClientInfo, signed: SignedInfo) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 54;
  const width = pageW - margin * 2;
  let y = margin;

  const ensure = (needed: number) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const paragraph = (text: string, size = 10, gap = 6) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, width) as string[];
    const lineH = size * 1.4;
    lines.forEach((line) => {
      ensure(lineH);
      doc.text(line, margin, y);
      y += lineH;
    });
    y += gap;
  };

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text(business.name, margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(75, 85, 99);
  doc.text(
    `${business.phoneDisplay} · ${business.email} · lordcleaningservices.com`,
    pageW - margin,
    y,
    { align: "right" },
  );
  y += 12;
  doc.setDrawColor(15, 118, 110);
  doc.setLineWidth(1.2);
  doc.line(margin, y, pageW - margin, y);
  y += 30;

  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Cleaning Service Agreement", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text(`Agreement ${data.id} · Prepared ${formatDate(data.prepared)} by ${data.preparedBy}`, margin, y);
  y += 26;

  // Details tables
  const table = (title: string, rows: [string, string][]) => {
    ensure(40);
    doc.setTextColor(17, 24, 39);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title, margin, y);
    y += 14;
    const labelW = 130;
    rows.forEach(([label, value]) => {
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(value, width - labelW) as string[];
      const rowH = Math.max(lines.length, 1) * 14 + 8;
      ensure(rowH);
      doc.setFillColor(243, 244, 246);
      doc.rect(margin, y - 10, labelW - 8, rowH - 4, "F");
      doc.setFont("helvetica", "bold");
      doc.text(label, margin + 6, y + 1);
      doc.setFont("helvetica", "normal");
      lines.forEach((line, i) => doc.text(line, margin + labelW, y + 1 + i * 14));
      y += rowH;
    });
    y += 10;
  };
  table("Client", clientRows(client));
  table("Service details", serviceRows(data));
  if (data.scope.trim()) {
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    ensure(14);
    doc.text("What's included", margin, y);
    y += 14;
    paragraph(data.scope.trim(), 10, 4);
  }
  y += 10;

  // Terms
  ensure(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Terms", margin, y);
  y += 16;
  buildTerms(data).forEach((term, i) => {
    ensure(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.text(`${i + 1}. ${term.title}`, margin, y);
    y += 14;
    paragraph(term.text, 10, 8);
  });

  // Signature
  ensure(170);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Client signature", margin, y);
  y += 10;
  const props = doc.getImageProperties(signed.signatureDataUrl);
  const scale = Math.min(260 / props.width, 90 / props.height);
  const sigW = props.width * scale;
  const sigH = props.height * scale;
  doc.addImage(signed.signatureDataUrl, "PNG", margin, y, sigW, sigH);
  y += sigH + 6;
  doc.setDrawColor(156, 163, 175);
  doc.setLineWidth(0.8);
  doc.line(margin, y, margin + 260, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${client.name}`, margin, y);
  y += 14;
  const stamp = signed.signedAt.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  doc.text(`Signed electronically: ${stamp}`, margin, y);
  y += 22;
  doc.setTextColor(75, 85, 99);
  doc.setFontSize(9);
  paragraph(
    `Accepted on behalf of ${business.name} by ${data.preparedBy}, who prepared this agreement on ${formatDate(data.prepared)}.`,
    9,
    0,
  );

  // Page numbers
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    doc.text(`${data.id} · Page ${p} of ${pages}`, pageW / 2, pageH - 28, { align: "center" });
  }

  const safeName = client.name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  doc.save(`Lord-Cleaning-Agreement-${data.id}-${safeName || "Client"}.pdf`);
}
