"use client";

import Image from "next/image";
import Link from "next/link";

const SocialIcons = ({
  icon: Icon,
  image,
  imageAlt = "",
  text,
  url,
  iconClassName = "h-[30px] w-[30px] shrink-0 text-white",
  imageClassName = "h-[30px] w-[30px] shrink-0 object-contain",
}) => {
  const renderVisual = () => {
    if (Icon) {
      return <Icon className={iconClassName} aria-hidden />;
    }

    if (image) {
      if (typeof image === "string") {
        return (
          <img
            src={image}
            alt={imageAlt || text || "Social link"}
            className={imageClassName}
          />
        );
      }

      return (
        <Image
          src={image}
          alt={imageAlt || text || "Social link"}
          width={30}
          height={30}
          className={imageClassName}
        />
      );
    }

    return null;
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-opacity hover:opacity-80"
    >
      <span className="flex items-center gap-2 md:gap-2">
        {renderVisual()}
        {text ? (
          <span className="flex flex-col items-center md:items-start">
            <p className="text-white">{text}</p>
          </span>
        ) : null}
      </span>
    </Link>
  );
};

export default SocialIcons;
