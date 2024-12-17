import { Navbar } from "../components/Navbar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NewsItem {
  id: number;
  date: string;
  title: string;
  content: string;
  category: 'update' | 'feature' | 'announcement';
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    date: '2024-03-17',
    title: 'Neue Suchfunktion',
    content: 'Wir haben die Suchfunktion verbessert. Jetzt können Sie nach Bundesland, Land und weiteren Kriterien filtern.',
    category: 'feature'
  },
  {
    id: 2,
    date: '2024-03-16',
    title: 'VIP Bereich Update',
    content: 'Der VIP Bereich wurde überarbeitet und bietet nun noch mehr exklusive Funktionen.',
    category: 'update'
  },
  {
    id: 3,
    date: '2024-03-15',
    title: 'Wartungsarbeiten',
    content: 'Am kommenden Wochenende werden Wartungsarbeiten durchgeführt, um die Performance zu verbessern.',
    category: 'announcement'
  }
];

const getCategoryColor = (category: NewsItem['category']) => {
  switch (category) {
    case 'update':
      return 'bg-blue-500';
    case 'feature':
      return 'bg-green-500';
    case 'announcement':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
};

export default function News() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-black">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-white mb-8">News & Updates</h1>
        
        <ScrollArea className="h-[600px] rounded-md">
          <div className="space-y-4">
            {newsItems.map((item) => (
              <Card key={item.id} className="p-6 bg-[#1A1F2C]/80 backdrop-blur-sm border-[#333] text-white">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-300">{item.content}</p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}