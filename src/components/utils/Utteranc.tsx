import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export default function Utteranc() {
  const setScript = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const createUtterancesEl = () => {
      const addScript = document.createElement("script");
      addScript.async = true;
      addScript.crossOrigin = "anonymous";
      addScript.src = "https://utteranc.es/client.js";
      addScript.setAttribute("repo", "10004ok/blogComment");
      addScript.setAttribute("issue-term", "title");
      addScript.setAttribute("label", "✨💬✨");
      addScript.setAttribute("theme", "github-light");

      setScript.current?.appendChild(addScript);
    };

    const changeTheme = () => {
      const message = {
        type: "set-theme",
        theme: theme === "dark" ? "github-dark" : "github-light",
      };
      utteranceEl?.contentWindow?.postMessage(message, "https://utteranc.es/client.js");
    };

    const utteranceEl: HTMLIFrameElement | null | undefined =
      setScript.current?.querySelector("iframe.utterances-frame");
    utteranceEl ? changeTheme() : createUtterancesEl();
  }, [theme]);

  return <div ref={setScript}></div>;
}
