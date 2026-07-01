import { Card, CardContent } from "@/components/ui/card";

function SummaryCard({ title, value, icon, color }) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        <div className={`rounded-xl p-4 ${color}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;