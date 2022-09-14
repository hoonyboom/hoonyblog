import { useRouter } from "next/router";
import useSound from "use-sound";

interface TabsProps {
  selectedCategory: string;
  i: number;
}

export default function CategoryTabs({ selectedCategory, i }: TabsProps) {
  const router = useRouter();
  const [tapSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  const onClick = () => {
    tapSound();
    router.push({ query: { category: selectedCategory } }, "/");
    sessionStorage.setItem("watchedTab", String(i));
  };

  return (
    <div onClick={onClick} className="basis-1/3 cursor-pointer">
      {selectedCategory}
    </div>
  );
}
