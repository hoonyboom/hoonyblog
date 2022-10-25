import { IconType } from "react-icons/lib";

interface IconBtnProps {
  Icon: IconType;
  isActive?: boolean;
  color?: string;
  darkColor?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function IconBtn({
  Icon,
  isActive,
  color,
  darkColor,
  children,
  onClick,
  ...props
}: IconBtnProps) {
  return (
    <button
      className={"opacity-10 transition hover:opacity-100"}
      onClick={onClick}
      {...props}
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
