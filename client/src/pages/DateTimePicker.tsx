import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WheelPicker from "@/components/WheelPicker";
import { Calendar, Clock, AlertCircle, Check, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DateTimePicker() {
  const { toast } = useToast();
  const now = new Date();
  
  const [selectedDay, setSelectedDay] = useState(now.getDate());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedHour, setSelectedHour] = useState(now.getHours());
  const [selectedMinute, setSelectedMinute] = useState(now.getMinutes());

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  const getFormattedDate = () => {
    const monthName = months[selectedMonth];
    return `${selectedDay} ${monthName} ${selectedYear}`;
  };

  const getFormattedTime = () => {
    return `${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`;
  };

  const handleConfirm = () => {
    const selectedDateTime = new Date(
      selectedYear,
      selectedMonth,
      selectedDay,
      selectedHour,
      selectedMinute
    );
    
    console.log("Fecha y hora confirmada:", selectedDateTime.toISOString());
    
    toast({
      title: "Fecha y Hora Confirmada",
      description: `${getFormattedDate()} - ${getFormattedTime()}`,
    });
  };

  const handleReset = () => {
    const now = new Date();
    setSelectedDay(now.getDate());
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
    setSelectedHour(now.getHours());
    setSelectedMinute(now.getMinutes());
    console.log("Resetear a fecha actual");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <header className="text-center py-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <AlertCircle className="w-6 h-6" />
            <h1 className="text-xl font-semibold" data-testid="text-title">Reporte de Alerta</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Selecciona la fecha y hora del evento
          </p>
        </header>

        <div className="space-y-6">
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Fecha del Evento
              </h2>
            </div>
            
            <Card className="p-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-center text-muted-foreground font-medium">Día</p>
                  <WheelPicker
                    values={days}
                    value={selectedDay}
                    onChange={(val) => setSelectedDay(val as number)}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-center text-muted-foreground font-medium">Mes</p>
                  <WheelPicker
                    values={months}
                    value={months[selectedMonth]}
                    onChange={(val) => setSelectedMonth(months.indexOf(val as string))}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-center text-muted-foreground font-medium">Año</p>
                  <WheelPicker
                    values={years}
                    value={selectedYear}
                    onChange={(val) => setSelectedYear(val as number)}
                  />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Hora del Evento
              </h2>
            </div>
            
            <Card className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-center text-muted-foreground font-medium">Hora</p>
                  <WheelPicker
                    values={hours}
                    value={String(selectedHour).padStart(2, "0")}
                    onChange={(val) => setSelectedHour(parseInt(val as string))}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-center text-muted-foreground font-medium">Minutos</p>
                  <WheelPicker
                    values={minutes}
                    value={String(selectedMinute).padStart(2, "0")}
                    onChange={(val) => setSelectedMinute(parseInt(val as string))}
                  />
                </div>
              </div>
            </Card>
          </section>

          <Card className="p-4 bg-muted/50 border-muted-border">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground">Selección Actual</p>
                  <p className="font-semibold text-sm" data-testid="text-selected-datetime">
                    {getFormattedDate()} - {getFormattedTime()}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-3 pt-2">
            <Button
              className="w-full"
              size="lg"
              onClick={handleConfirm}
              data-testid="button-confirm"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirmar Fecha y Hora
            </Button>
            
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleReset}
              data-testid="button-reset"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restablecer
            </Button>
          </div>
        </div>

        <footer className="text-center py-4">
          <p className="text-xs text-muted-foreground">
            Lista para integración con Telegram Bot
          </p>
        </footer>
      </div>
    </div>
  );
}
