import { useState } from "react";
import WheelPicker from "../WheelPicker";

export default function WheelPickerExample() {
  const [selectedDay, setSelectedDay] = useState(15);
  
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="w-full max-w-xs">
        <h3 className="text-lg font-semibold mb-4 text-center">Ejemplo: Selector de Día</h3>
        <WheelPicker
          values={days}
          value={selectedDay}
          onChange={(val) => setSelectedDay(val as number)}
        />
        <p className="text-center mt-4 text-muted-foreground">
          Día seleccionado: <span className="font-semibold text-foreground">{selectedDay}</span>
        </p>
      </div>
    </div>
  );
}
