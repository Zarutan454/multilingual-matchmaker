import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Filter, Search, SortAsc, SortDesc } from "lucide-react";

interface GalleryFiltersProps {
  categories: string[];
  onFilterChange: (filters: {
    search: string;
    category: string;
    sortBy: string;
    sortDirection: 'asc' | 'desc';
  }) => void;
}

export const GalleryFilters = ({ categories, onFilterChange }: GalleryFiltersProps) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleFilterChange = () => {
    onFilterChange({
      search,
      category,
      sortBy,
      sortDirection
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t("searchImages")}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleFilterChange();
              }}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={category || "all"} onValueChange={(value) => {
          setCategory(value);
          handleFilterChange();
        }}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("selectCategory")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("allCategories")}
            </SelectItem>
            {categories.length > 0 && categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => {
          setSortBy(value);
          handleFilterChange();
        }}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t("sortBy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">{t("uploadDate")}</SelectItem>
            <SelectItem value="name">{t("fileName")}</SelectItem>
            <SelectItem value="size">{t("fileSize")}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
            handleFilterChange();
          }}
        >
          {sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};