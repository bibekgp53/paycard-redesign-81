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
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const darkBlue = rgb(15 / 255, 31 / 255, 56 / 255);
    const white = rgb(1, 1, 1);
    const navyBlue = rgb(0.05, 0.08, 0.2);
    
    // Helper function to draw text with different fonts
    const drawText = (text: string, x: number, y: number, fontSize: number, isBold: boolean = false) => {
      page.drawText(text, { 
        x, 
        y, 
        size: fontSize, 
        font: isBold ? helveticaBold : helveticaFont 
      });
    };

    // Header
    let y = 810;
    drawText("Standard Bank", 40, y, 28, true);
    y -= 24;
    drawText("The Standard Bank of South Africa Limited", 40, y, 10);
    y -= 14;
    drawText("Reg. No. 1962/000738/06 Registered Bank", 40, y, 10);
    y -= 14;
    drawText("Vat Registration Number 4010105461", 40, y, 10);
    y -= 14;
    drawText("P.O. Box 62355 Marshalltown 2107", 40, y, 10);

    // Company details
    y -= 30;
    drawText(company, 40, y, 12, true);
    companyNumbers.forEach((num, idx) => {
      drawText(num, 40, y - (idx + 1) * 14, 10);
    });

    // Invoice box (right side)
    y = 810;
    // Draw border for the info box
    page.drawRectangle({ 
      x: 350, 
      y: y - 80, 
      width: 200, 
      height: 80, 
      borderColor: rgb(0, 0, 0), 
      borderWidth: 1,
      color: rgb(1,1,1),
      opacity: 0
    });
    
    // Invoice table headers
    drawText("Date of Invoice", 360, y - 20, 10);
    drawText(invoiceDate, 510, y - 20, 10, true);
    
    drawText("Invoice number", 360, y - 40, 10);
    drawText(invoiceNumber, 510, y - 40, 10, true);
    
    drawText("Profile/Reference number", 360, y - 60, 10);
    drawText(referenceNumber, 510, y - 60, 10, true);
    
    // VAT registration (outside the box)
    drawText("VAT Registration No", 360, y - 100, 10);
    drawText(vatReg, 510, y - 100, 10, true);

    // Table header - Dark blue background
    y = 600;
    page.drawRectangle({
      x: 40,
      y: y - 20,
      width: 515,
      height: 28,
      color: navyBlue
    });
    
    // White text for headers
    drawText("Description", 50, y - 10, 14);
    page.drawText("Description", { x: 50, y: y - 10, size: 14, font: helveticaBold, color: white });
    page.drawText("Amount", { x: 320, y: y - 10, size: 14, font: helveticaBold, color: white });
    page.drawText("Fee", { x: 490, y: y - 10, size: 14, font: helveticaBold, color: white });

    // Table rows
    let rowY = y - 50;
    cards.forEach((card, i) => {
      drawText(`Card Load for: ${card.cardNumber}`, 50, rowY, 10);
      drawText(formatRand(card.transferAmount), 320, rowY, 10);
      drawText(formatRand(card.transferFee), 490, rowY, 10);
      rowY -= 30;
    });

    // Summary section
    y = rowY;
    // Sub Total
    drawText("Sub Total", 400, y, 10, true);
    drawText(formatRand(subtotal), 490, y, 10, true);
    
    // VAT
    y -= 25;
    drawText(`VAT included @ ${(vatRate * 100).toFixed(0)}%`, 400, y, 10);
    drawText(formatRand(vat), 490, y, 10);
    
    // Total
    y -= 25;
    drawText("Total", 400, y, 12, true);
    drawText(formatRand(total), 490, y, 12, true);

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
