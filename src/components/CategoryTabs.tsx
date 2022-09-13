import { useRouter } from "next/router";

interface TabsProps {
  selectedCategory: string;
  i: number;
}

export default function CategoryTabs({ selectedCategory, i }: TabsProps) {
  const router = useRouter();
  const onClick = () => {
    router.push({ query: { category: selectedCategory } }, "/");
    localStorage.setItem("watchedTab", JSON.stringify({ val: i }));
  };

  return (
    <div onClick={onClick} className="basis-1/3 cursor-pointer">
      {selectedCategory}
    </div>
  );
}
