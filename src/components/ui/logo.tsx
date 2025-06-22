import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  className?: string;
}

export function Logo({
  size = "md",
  showText = true,
  href = "/",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: { width: 32, height: 32, textSize: "text-lg" },
    md: { width: 48, height: 48, textSize: "text-2xl" },
    lg: { width: 64, height: 64, textSize: "text-3xl" },
  };

  const { width, height, textSize } = sizeMap[size];

  const logoContent = (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <Image
          src="/logo.svg"
          alt="Cartas Cósmicas"
          width={width}
          height={height}
          className="group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      {showText && (
        <div>
          <h1
            className={`font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent ${textSize}`}
          >
            Cartas Cósmicas
          </h1>
          <p className="text-xs text-purple-300">
            Mensagens que transcendem o tempo
          </p>
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{logoContent}</Link>;
  }

  return logoContent;
}
