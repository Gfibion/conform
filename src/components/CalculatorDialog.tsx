import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { ScientificCalculator } from "./ScientificCalculator";
import { useState } from "react";

interface CalculatorDialogProps {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const CalculatorDialog: React.FC<CalculatorDialogProps> = ({ 
  children, 
  variant = "outline", 
  size = "sm",
  className = ""
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant} size={size} className={className}>
            <Calculator className="w-4 h-4 mr-2" />
            Calculator
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <ScientificCalculator onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};