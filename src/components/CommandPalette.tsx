import { useRouter } from "next/router";
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from "kbar";
import { LayoutProps } from "@/components/Layout";
import { VscGithubInverted, VscTwitter, VscCode } from "react-icons/vsc";
import { TbPencil } from "react-icons/tb";
import { SiAboutdotme } from "react-icons/si";
import { IoCloud } from "react-icons/io5";
import { GiCircle } from "react-icons/gi";
import useSound from "use-sound";

export default function CommandPalette({ children }: LayoutProps) {
  const router = useRouter();
  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home",
      section: "_root",
      perform: () => router.push("/"),
      icon: <GiCircle className="w-4 h-4" />,
    },
    {
      id: "writing",
      name: "Writing",
      shortcut: ["w"],
      keywords: "writing",
      section: "_root",
      perform: () => router.push("/category/writing", "/writing"),
      icon: <TbPencil className="w-4 h-4" />,
    },
    {
      id: "coding",
      name: "Coding",
      shortcut: ["c"],
      keywords: "coding",
      section: "_root",
      perform: () => router.push("/category/coding", "/coding"),
      icon: <VscCode className="w-4 h-4" />,
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "github",
      section: "public",
      perform: () => window.open("https://github.com/10004ok", "_blank"),
      icon: <VscGithubInverted className="w-4 h-4" />,
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["t"],
      keywords: "twitter",
      section: "public",
      perform: () => window.open("https://twitter.com/hyezoprk", "_blank"),
      icon: <VscTwitter className="w-4 h-4" />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["a"],
      keywords: "about",
      section: "README.md",
      perform: () => router.push("/category/about", "/about"),
      icon: <SiAboutdotme className="w-4 h-4" />,
    },
    // {
    //   id: 'copy',
    //   name: 'Copy URL',
    //   shortcut: ['u'],
    //   keywords: 'copy-url',
    //   section: 'etc..',
    //   perform: () => navigator.clipboard.writeText(window.location.href),
    //   icon: <CopyIcon className="w-4 h-4" />,
    // },
    // {
    //   id: 'email',
    //   name: 'Send Email',
    //   shortcut: ['e'],
    //   keywords: 'send-email',
    //   section: 'etc..',
    //   perform: () => window.open('mailto:hyezoprk@kakao.com', '_blank'),
    //   icon: <EnvelopeClosedIcon className="w-4 h-4" />,
    // },
  ];

  return (
    <KBarProvider actions={actions} options={{ disableScrollbarManagement: true }}>
      <KBarPortal>
        <KBarPositioner className="z-10 bg-zinc-900/80">
          <KBarAnimator className="max-w-lg w-full overflow-y-auto rounded-lg shadow-lg">
            <div className="flex relative text-gray-600 focus-within:text-gray-400">
              <button
                type="submit"
                className="py-4 px-2 bg-white dark:bg-zinc-800 focus:outline-none focus:shadow-outline">
                <IoCloud
                  className="w-6 h-6 bg-white dark:bg-zinc-800 focus:outline-none focus:shadow-outline"
                  fill="skyblue"
                />
              </button>
              <KBarSearch
                className="py-4 px-3 bg-white dark:bg-zinc-800 text-black dark:text-white text-base w-full caret-blue-500 outline-none"
                defaultPlaceholder="첫글자를 이용하면 밖에서도 이동할 수 있어요 &nbsp;🚀"
              />
            </div>
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();
  const [tick] = useSound("/sounds/tick.mp3");
  const [tap] = useSound("/sounds/tap.mp3", { volume: 0.6 });

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <div
          className={`
          flex items-center justify-between cursor-pointer px-3 py-1 w-full border-white dark:border-zinc-800 border-2 text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-zinc-800`}>
          {typeof item === "string" ? (
            <div className="text-gray-500/80 text-xs ">{item}</div>
          ) : (
            <div
              onMouseEnter={() => tick()}
              onMouseUp={() => tap()}
              className={`${
                active ? "bg-emerald-600 text-gray-100 rounded-md" : "transparent"
              } 
            w-full text-base flex items-center space-x-3 p-2`}>
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </div>
          )}
        </div>
      )}
    />
  );
}
