import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full md:w-80">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <Input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

export default SearchBar;