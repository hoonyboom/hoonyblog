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
import { LayoutProps } from "./Layout";
import { VscGithubInverted, VscTwitter, VscCode } from "react-icons/vsc";
import { TbPencil } from "react-icons/tb";
import { SiAboutdotme } from "react-icons/si";
import { IoCloud } from "react-icons/io5";
import { GiCircle } from "react-icons/gi";
export default function CommandPalette({ children }: LayoutProps) {
  const router = useRouter();
  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["h"],
      keywords: "home",
      section: "Category",
      perform: () => router.push("/"),
      icon: <GiCircle className="w-4 h-4" />,
    },
    {
      id: "writing",
      name: "Writing",
      shortcut: ["w"],
      keywords: "writing",
      section: "Category",
      perform: () => router.push("/category/writing", "/writing"),
      icon: <TbPencil className="w-4 h-4 " />,
    },
    {
      id: "coding",
      name: "Coding",
      shortcut: ["c"],
      keywords: "coding",
      section: "Category",
      perform: () => router.push("/category/coding", "/coding"),
      icon: <VscCode className="w-4 h-4" />,
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "github",
      section: "Social",
      perform: () => window.open("https://github.com/10004ok", "_blank"),
      icon: <VscGithubInverted className="w-4 h-4" />,
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["t"],
      keywords: "twitter",
      section: "Social",
      perform: () => window.open("https://twitter.com/hyezoprk", "_blank"),
      icon: <VscTwitter className="w-4 h-4" />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["a"],
      keywords: "about",
      section: "etc",
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
        <KBarPositioner className="z-10 bg-gray-1000/80">
          <KBarAnimator className="max-w-lg w-full overflow-y-auto rounded-lg shadow-lg">
            <div className="rounded-t-lg flex items-center relative text-gray-600 focus-within:text-gray-400">
              <span className="">
                <button
                  type="submit"
                  className="py-3 px-2 bg-white dark:bg-gray-800 focus:outline-none focus:shadow-outline">
                  <IoCloud
                    className="w-6 h-6 bg-white dark:bg-gray-800 focus:outline-none focus:shadow-outline"
                    fill="skyblue"
                  />
                </button>
              </span>
              <KBarSearch
                className="py-3 px-3 bg-white dark:bg-gray-800 text-black dark:text-white text-base w-full caret-blue-500 outline-none"
                placeholder="Type a command or search…"
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

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <div
          className={`
          flex items-center justify-between cursor-pointer px-3 py-1 w-full text-gray-900 dark:text-gray-100 text-sm bg-white dark:bg-gray-800`}>
          {typeof item === "string" ? (
            <div className="text-gray-200 text-xs">{item}</div>
          ) : (
            <div
              className={`${
                active ? "bg-gray-500 text-gray-100 rounded-md" : "transparent"
              } 
            w-full text-base flex items-center space-x-2 p-2`}>
              {item.icon}
              <p className="text-sm">{item.name}</p>
            </div>
          )}
        </div>
      )}
    />
  );
}
