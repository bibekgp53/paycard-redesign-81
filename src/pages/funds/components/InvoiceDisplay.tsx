
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface InvoiceCard {
  cardNumber: string;
  transferAmount: number;
  transferFee: number;
}

interface InvoiceDisplayProps {
  invoiceNumber: string;
  invoiceDate: string;
  referenceNumber: string;
  vatReg: string;
  company: string;
  companyNumbers: string[];
  cards: InvoiceCard[];
  vatRate: number;
}

function formatRand(amount: number) {
  return "R " + amount.toFixed(2);
}

export const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({
  invoiceNumber, invoiceDate, referenceNumber, vatReg, company,
  companyNumbers, cards, vatRate
}) => {
  const navigate = useNavigate();

  // Invoice calculations
  const subtotal = cards.reduce((acc, c) => acc + c.transferFee, 0);
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  // PDF Download Handler
  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const darkBlue = rgb(15 / 255, 31 / 255, 56 / 255);

    let y = 810;
    // Header
    page.drawText("Standard Bank", { x: 40, y, size: 26, font, color: darkBlue });
    y -= 24;
    page.drawText("The Standard Bank of South Africa Limited", { x: 40, y, size: 10, font });
    y -= 12;
    page.drawText("Reg. No. 1962/000738/06 Registered Bank", { x: 40, y, size: 10, font });
    y -= 12;
    page.drawText("Vat Registration Number 4010105461", { x: 40, y, size: 10, font });
    y -= 12;
    page.drawText("P.O. Box 62355 Marshalltown 2107", { x: 40, y, size: 10, font });

    // Company
    y -= 30;
    page.drawText(company, { x: 40, y, size: 12, font, color: darkBlue });
    companyNumbers.forEach((num, idx) => {
      page.drawText(num, { x: 40, y: y - (idx + 1) * 13, size: 10, font });
    });

    // Invoice box
    y = 810;
    page.drawRectangle({ x: 350, y: y - 2, width: 200, height: 65, borderColor: darkBlue, color: rgb(1,1,1), opacity: 0, borderWidth: 1 });
    page.drawText("Tax Invoice", { x: 360, y: y + 40, size: 11, font, color: darkBlue });
    page.drawText("Date of Invoice", { x: 360, y: y + 26, size: 9, font });
    page.drawText(invoiceDate, { x: 480, y: y + 26, size: 9, font });
    page.drawText("Invoice number", { x: 360, y: y + 13, size: 9, font });
    page.drawText(invoiceNumber, { x: 480, y: y + 13, size: 9, font });
    page.drawText("Profile/Reference number", { x: 360, y: y, size: 9, font });
    page.drawText(referenceNumber, { x: 480, y: y, size: 9, font });
    page.drawText("VAT Registration No", { x: 360, y: y - 13, size: 9, font });
    page.drawText(vatReg, { x: 480, y: y - 13, size: 9, font });

    // Table header
    y -= 90;
    page.drawRectangle({ x: 40, y: y, width: 515, height: 24, color: darkBlue });
    page.drawText("Description", { x: 46, y: y + 8, size: 11.5, font, color: rgb(1,1,1) });
    page.drawText("Amount", { x: 285, y: y + 8, size: 11.5, font, color: rgb(1,1,1) });
    page.drawText("Fee", { x: 420, y: y + 8, size: 11.5, font, color: rgb(1,1,1) });

    // Table body
    let rowY = y - 24;
    cards.forEach(card => {
      page.drawText(`Card Load for: ${card.cardNumber}`, { x: 46, y: rowY + 8, size: 10.5, font });
      page.drawText(formatRand(card.transferAmount), { x: 285, y: rowY + 8, size: 10.5, font });
      page.drawText(formatRand(card.transferFee), { x: 420, y: rowY + 8, size: 10.5, font });
      rowY -= 24;
    });

    // Subtotal, VAT, Total
    page.drawText("Sub Total", { x: 420, y: rowY + 8, size: 10, font });
    page.drawText(formatRand(subtotal), { x: 495, y: rowY + 8, size: 10, font });
    rowY -= 24;
    page.drawText(`VAT included @ ${(vatRate * 100).toFixed(0)}%`, { x: 420, y: rowY + 8, size: 10, font });
    page.drawText(formatRand(vat), { x: 495, y: rowY + 8, size: 10, font });
    rowY -= 24;
    page.drawText("Total", { x: 420, y: rowY + 8, size: 11, font, color: darkBlue });
    page.drawText(formatRand(total), { x: 495, y: rowY + 8, size: 11, font, color: darkBlue });

    // Save
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `invoice-${invoiceNumber}.pdf`;
    link.click();
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-pcard-dark-blue mb-2 tracking-tight">Invoice</h1>
      <p className="mb-6 text-lg text-gray-700 text-center">Your card load request has been submitted and will be processed immediately.</p>

      {/* PDF Preview (browser PDF object/embed won't display locally, so provide Download) */}
      <div className="w-full max-w-3xl bg-white p-8 border-2 border-pcard-blue-200 rounded-card mb-8">
        <div className="flex justify-between">
          <span className="text-pcard-dark-blue font-bold text-xl">Standard Bank</span>
          <span className="text-sm">Tax Invoice</span>
        </div>
        <div className="flex flex-row gap-6 mt-1">
          <div className="flex flex-col">
            <span className="font-medium">{company}</span>
            {companyNumbers.map((num, idx) => (
              <span key={idx} className="text-xs">{num}</span>
            ))}
          </div>
          <div className="ml-auto">
            <table className="text-[13px]">
              <tbody>
                <tr><td>Date of Invoice:</td><td className="pl-2">{invoiceDate}</td></tr>
                <tr><td>Invoice number:</td><td className="pl-2">{invoiceNumber}</td></tr>
                <tr><td>Reference No:</td><td className="pl-2">{referenceNumber}</td></tr>
                <tr><td>VAT Reg No:</td><td className="pl-2">{vatReg}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-6">
          <table className="min-w-full border-collapse border border-pcard-blue-100">
            <thead>
              <tr>
                <th className="bg-pcard-blue-700 text-white px-4 py-2 text-left">Description</th>
                <th className="bg-pcard-blue-700 text-white px-4 py-2 text-left">Amount</th>
                <th className="bg-pcard-blue-700 text-white px-4 py-2 text-left">Fee</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card, idx) => (
                <tr key={idx}>
                  <td className="border border-pcard-blue-100 p-2">Card Load for: {card.cardNumber}</td>
                  <td className="border border-pcard-blue-100 p-2">{formatRand(card.transferAmount)}</td>
                  <td className="border border-pcard-blue-100 p-2">{formatRand(card.transferFee)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td className="border border-pcard-blue-100 p-2 font-semibold">Sub Total</td>
                <td className="border border-pcard-blue-100 p-2">{formatRand(subtotal)}</td>
              </tr>
              <tr>
                <td></td>
                <td className="border border-pcard-blue-100 p-2">VAT @ {(vatRate * 100).toFixed(0)}%</td>
                <td className="border border-pcard-blue-100 p-2">{formatRand(vat)}</td>
              </tr>
              <tr>
                <td></td>
                <td className="border border-pcard-blue-100 p-2 font-bold text-pcard-dark-blue">Total</td>
                <td className="border border-pcard-blue-100 p-2 font-bold text-pcard-dark-blue">{formatRand(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Download button */}
        <div className="mt-6 text-right">
          <Button variant="secondary" onClick={handleDownloadPDF} className="bg-pcard-blue-600 hover:bg-pcard-blue-700">
            Download PDF
          </Button>
        </div>
      </div>

      {/* Footer action buttons */}
      <div className="flex flex-wrap w-full max-w-3xl justify-center gap-4 mt-2">
        <Button
          className="bg-pcard-dark-blue hover:bg-pcard-blue-800"
          onClick={() => navigate("/dashboard")}
        >I'M FINISHED</Button>
        <Button
          className="bg-pcard-salmon hover:bg-pcard-salmon-medium"
          onClick={() => navigate("/deposit-funds")}
        >DEPOSIT FUNDS</Button>
        <Button
          className="bg-pcard-status-blue hover:bg-pcard-blue-600"
          onClick={() => navigate("/statements")}
        >VIEW STATEMENT</Button>
      </div>
    </div>
  );
};
