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
      icon: <GiCircle className="h-4 w-4" />,
    },
    {
      id: "writing",
      name: "Writing",
      shortcut: ["w"],
      keywords: "writing",
      section: "_root",
      perform: () => router.push("/category/writing", "/writing"),
      icon: <TbPencil className="h-4 w-4" />,
    },
    {
      id: "coding",
      name: "Coding",
      shortcut: ["c"],
      keywords: "coding",
      section: "_root",
      perform: () => router.push("/category/coding", "/coding"),
      icon: <VscCode className="h-4 w-4" />,
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "github",
      section: "public",
      perform: () => window.open("https://github.com/10004ok", "_blank"),
      icon: <VscGithubInverted className="h-4 w-4" />,
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["t"],
      keywords: "twitter",
      section: "public",
      perform: () => window.open("https://twitter.com/hyezoprk", "_blank"),
      icon: <VscTwitter className="h-4 w-4" />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["a"],
      keywords: "about",
      section: "README.md",
      perform: () => router.push("/category/about", "/about"),
      icon: <SiAboutdotme className="h-4 w-4" />,
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
          <KBarAnimator className="w-full max-w-lg overflow-y-auto rounded-lg shadow-lg">
            <div className="relative flex text-gray-600 focus-within:text-gray-400">
              <button
                type="submit"
                className="bg-white py-4 px-2 focus:shadow-md dark:bg-zinc-800"
              >
                <IoCloud
                  className="h-6 w-6 bg-white focus:shadow-md dark:bg-zinc-800"
                  fill="skyblue"
                />
              </button>
              <KBarSearch
                className="w-full bg-white py-4 px-3 text-base text-black caret-blue-500 outline-none dark:bg-zinc-800 dark:text-white"
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
          flex w-full cursor-pointer items-center justify-between border-2 border-white bg-white px-3 py-1 text-sm text-gray-900 dark:border-zinc-800 dark:bg-zinc-800 dark:text-gray-100`}
        >
          {typeof item === "string" ? (
            <div className="text-gray-500/80">{item}</div>
          ) : (
            <div
              onMouseEnter={() => tick()}
              onMouseUp={() => tap()}
              className={`${
                active ? "rounded-md bg-emerald-600 text-gray-100" : "transparent"
              } 
            flex w-full items-center space-x-3 p-2 text-base`}
            >
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </div>
          )}
        </div>
      )}
    />
  );
}
