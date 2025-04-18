
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

// Mock data - will be replaced with API data later
const mockData = [
  { id: 1, name: "John Doe", cardNumber: "**** **** **** 1234", fee: "$2.50" },
  { id: 2, name: "Jane Smith", cardNumber: "**** **** **** 5678", fee: "$2.50" },
  { id: 3, name: "Bob Johnson", cardNumber: "**** **** **** 9012", fee: "$2.50" },
];

export default function CardLoads() {
  return (
    <div className="space-y-6">
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </Card>

      <Card className="bg-white p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NAME</TableHead>
                <TableHead>CARD NUMBER</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>FEE</TableHead>
                <TableHead>NOTIFY VIA SMS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.cardNumber}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="w-32"
                      min="0"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>{row.fee}</TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
