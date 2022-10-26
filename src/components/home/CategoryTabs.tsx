import { useRouter } from "next/router";
import useSound from "use-sound";

interface TabsProps {
  category: string;
  i: number;
}

export default function CategoryTabs({ category, i }: TabsProps) {
  const router = useRouter();
  const [tapSound] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  const onClick = () => {
    tapSound();
    sessionStorage.setItem("watchedTab", String(i));
    router.push({ query: { category } }, "/");
  };

  return (
    <div onClick={onClick} className="basis-1/3 cursor-fancyHover select-none">
      {category}
    </div>
  );
}
