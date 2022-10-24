import { IconType } from "react-icons/lib";

interface IconBtnProps {
  Icon: IconType;
  isActive?: boolean;
  color?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function IconBtn({
  Icon,
  isActive,
  color,
  children,
  onClick,
}: IconBtnProps) {
  return (
    <button
      className={`opacity-10 transition hover:opacity-100 ${isActive ? "" : ""} `}
      onClick={onClick}
    >
      <div className="flex place-items-center">
        <span className={`${children != null ? "mr-1" : ""}`}>
          <Icon fill={color} />
        </span>
        {children}
      </div>
    </button>
  );
}
