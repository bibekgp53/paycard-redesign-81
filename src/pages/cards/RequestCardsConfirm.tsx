import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/ui/icon";
import { Download } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

type FormValues = {
  numberOfCards: number;
  receiverName: string;
  receiverId: string;
  contactNumber: string;
  alternativeContactNumber?: string;
  deliveryMethod: string;
  deliveryAddress: string;
  city: string;
  code: string;
};

export default function RequestCardsConfirm() {
  const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as FormValues;
  const cardCost = location.state?.cardCost;

  // If no formData is available, redirect back to the request form
  if (!formData) {
    navigate('/cards/request');
    return null;
  }

  const handleEdit = () => {
    navigate('/cards/request', { state: { formData } });
  };

  const handleConfirm = () => {
    setIsCompleted(true);
  };

  const handleFinished = () => {
    navigate('/cards/request');
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-ZA');
  };

  const handleDownloadInvoice = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const { width, height } = page.getSize();
      
      // Load fonts
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      // Document title
      page.drawText('INVOICE', {
        x: 50,
        y: height - 50,
        size: 24,
        font: fontBold,
        color: rgb(0.05, 0.12, 0.22), // Dark navy blue
      });
      
      // Invoice details
      const currentDate = new Date();
      const invoiceNumber = generateInvoiceNumber();
      const referenceNumber = `ORD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
      const vatReg = "4010105461";
      
      page.drawText(`Standard Bank`, {
        x: 50,
        y: height - 80,
        size: 12,
        font: fontRegular,
      });
      
      page.drawText(`The Standard Bank of South Africa Limited`, {
        x: 50,
        y: height - 100,
        size: 10,
        font: fontRegular,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      page.drawText(`Reg. No. 1962/000738/06`, {
        x: 50,
        y: height - 115,
        size: 10,
        font: fontRegular,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      // Right aligned info
      page.drawText(`Invoice Number: ${invoiceNumber}`, {
        x: width - 250,
        y: height - 80,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`Date: ${formatDate(currentDate)}`, {
        x: width - 250,
        y: height - 95,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`Reference: ${referenceNumber}`, {
        x: width - 250,
        y: height - 110,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`VAT Registration: ${vatReg}`, {
        x: width - 250,
        y: height - 125,
        size: 10,
        font: fontRegular,
      });
      
      // Customer details
      page.drawText('Billed To:', {
        x: 50,
        y: height - 180,
        size: 12,
        font: fontBold,
      });
      
      page.drawText(`${formData.receiverName}`, {
        x: 50,
        y: height - 200,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`ID: ${formData.receiverId}`, {
        x: 50,
        y: height - 215,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`${formData.deliveryAddress}`, {
        x: 50,
        y: height - 230,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`${formData.city}, ${formData.code}`, {
        x: 50,
        y: height - 245,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`Contact: ${formData.contactNumber}`, {
        x: 50,
        y: height - 260,
        size: 10,
        font: fontRegular,
      });
      
      if (formData.alternativeContactNumber) {
        page.drawText(`Alt. Contact: ${formData.alternativeContactNumber}`, {
          x: 50,
          y: height - 275,
          size: 10,
          font: fontRegular,
        });
      }
      
      // Invoice table header
      const tableTop = height - 320;
      
      // Draw table header
      page.drawRectangle({
        x: 50,
        y: tableTop - 20,
        width: width - 100,
        height: 20,
        color: rgb(0.05, 0.12, 0.22),
      });
      
      page.drawText('Description', {
        x: 60,
        y: tableTop - 13,
        size: 10,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
      
      page.drawText('Quantity', {
        x: 250,
        y: tableTop - 13,
        size: 10,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
      
      page.drawText('Unit Price', {
        x: 350,
        y: tableTop - 13,
        size: 10,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
      
      page.drawText('Amount', {
        x: 450,
        y: tableTop - 13,
        size: 10,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
      
      // Table row 1
      page.drawText('Prepaid Cards', {
        x: 60,
        y: tableTop - 40,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`${formData.numberOfCards}`, {
        x: 250,
        y: tableTop - 40,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`R ${cardCost.perCardCost.toFixed(2)}`, {
        x: 350,
        y: tableTop - 40,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`R ${cardCost.totalCardCost.toFixed(2)}`, {
        x: 450,
        y: tableTop - 40,
        size: 10,
        font: fontRegular,
      });
      
      // Draw separator
      page.drawLine({
        start: { x: 50, y: tableTop - 50 },
        end: { x: width - 50, y: tableTop - 50 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
      
      // Table row 2
      page.drawText(`Delivery Fee (${formData.deliveryMethod})`, {
        x: 60,
        y: tableTop - 70,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText('1', {
        x: 250,
        y: tableTop - 70,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`R ${cardCost.deliveryFee.toFixed(2)}`, {
        x: 350,
        y: tableTop - 70,
        size: 10,
        font: fontRegular,
      });
      
      page.drawText(`R ${cardCost.deliveryFee.toFixed(2)}`, {
        x: 450,
        y: tableTop - 70,
        size: 10,
        font: fontRegular,
      });
      
      // Draw separator
      page.drawLine({
        start: { x: 50, y: tableTop - 80 },
        end: { x: width - 50, y: tableTop - 80 },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
      });
      
      // Total
      page.drawText('Total:', {
        x: 400,
        y: tableTop - 100,
        size: 12,
        font: fontBold,
      });
      
      page.drawText(`R ${cardCost.totalCostWithDelivery.toFixed(2)}`, {
        x: 450,
        y: tableTop - 100,
        size: 12,
        font: fontBold,
      });
      
      // Thank you note
      page.drawText('Thank you for your order. Your cards will be delivered to the address provided.', {
        x: width / 2 - 200,
        y: tableTop - 150,
        size: 10,
        font: fontRegular,
        color: rgb(0.4, 0.4, 0.4),
      });
      
      // Serialize the PDF document
      const pdfBytes = await pdfDoc.save();
      
      // Create a Blob from the PDF data
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `card_order_invoice_${invoiceNumber}.pdf`;
      link.click();
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (isCompleted) {
    const currentDate = new Date();
    const invoiceNumber = generateInvoiceNumber();
    const referenceNumber = `ORD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
    const vatReg = "4010105461";
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-paycard-navy">Card Order Invoice</h1>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={handleDownloadInvoice}
          >
            <Download size={16} />
            Download
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between mb-6">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-paycard-navy">INVOICE</h2>
                <p className="text-gray-600">Standard Bank</p>
                <p className="text-sm text-gray-500">The Standard Bank of South Africa Limited</p>
                <p className="text-sm text-gray-500">Reg. No. 1962/000738/06</p>
              </div>
              <div className="text-right">
                <p className="text-sm"><span className="font-medium">Invoice Number:</span> {invoiceNumber}</p>
                <p className="text-sm"><span className="font-medium">Date:</span> {formatDate(currentDate)}</p>
                <p className="text-sm"><span className="font-medium">Reference:</span> {referenceNumber}</p>
                <p className="text-sm"><span className="font-medium">VAT Registration:</span> {vatReg}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Billed To:</h3>
              <p>{formData.receiverName}</p>
              <p>ID: {formData.receiverId}</p>
              <p>{formData.deliveryAddress}</p>
              <p>{formData.city}, {formData.code}</p>
              <p>Contact: {formData.contactNumber}</p>
              {formData.alternativeContactNumber && (
                <p>Alt. Contact: {formData.alternativeContactNumber}</p>
              )}
            </div>

            <div className="mt-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-paycard-navy text-white">
                    <th className="p-2">Description</th>
                    <th className="p-2 text-right">Quantity</th>
                    <th className="p-2 text-right">Unit Price</th>
                    <th className="p-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Prepaid Cards</td>
                    <td className="p-2 text-right">{formData.numberOfCards}</td>
                    <td className="p-2 text-right">R {cardCost.perCardCost.toFixed(2)}</td>
                    <td className="p-2 text-right">R {cardCost.totalCardCost.toFixed(2)}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Delivery Fee ({formData.deliveryMethod})</td>
                    <td className="p-2 text-right">1</td>
                    <td className="p-2 text-right">R {cardCost.deliveryFee.toFixed(2)}</td>
                    <td className="p-2 text-right">R {cardCost.deliveryFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-right" colSpan={3}><strong>Total:</strong></td>
                    <td className="p-2 text-right font-bold">R {cardCost.totalCostWithDelivery.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-6">Thank you for your order. Your cards will be delivered to the address provided.</p>
              <Button onClick={handleFinished} className="w-full max-w-xs">
                I'M FINISHED
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Confirm Card Order</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8">
        Please review your card order details below before confirming.
      </p>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Card Order Cost</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Number of Cards:</span>
              <span>{formData.numberOfCards}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cost per Card:</span>
              <span>R {cardCost.perCardCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Card Cost:</span>
              <span>R {cardCost.totalCardCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Delivery Fee:</span>
              <span>R {cardCost.deliveryFee.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total Cost:</span>
              <span>R {cardCost.totalCostWithDelivery.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-paycard-navy mb-6">Delivery Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Receiver Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <p className="font-medium">{formData.receiverName}</p>
                </div>
                <div>
                  <span className="text-gray-600">ID Number:</span>
                  <p className="font-medium">{formData.receiverId}</p>
                </div>
                <div>
                  <span className="text-gray-600">Contact Number:</span>
                  <p className="font-medium">{formData.contactNumber}</p>
                </div>
                {formData.alternativeContactNumber && (
                  <div>
                    <span className="text-gray-600">Alternative Contact Number:</span>
                    <p className="font-medium">{formData.alternativeContactNumber}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Delivery Method</h3>
              <p className="font-medium">{formData.deliveryMethod}</p>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Delivery Address</h3>
              <div className="space-y-1">
                <p className="font-medium">{formData.deliveryAddress}</p>
                <p className="font-medium">{formData.city}</p>
                <p className="font-medium">{formData.code}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={handleEdit}
          className="flex-1"
        >
          EDIT
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1"
        >
          CONFIRM ORDER
        </Button>
      </div>
    </div>
  );
}
