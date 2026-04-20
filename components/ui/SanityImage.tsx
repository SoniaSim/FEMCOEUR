import Image, { type ImageProps } from "next/image";

export type SanityImageLike = {
  url: string | null;
  alt: string | null;
} | null | undefined;

type Props = Omit<ImageProps, "src" | "alt"> & {
  image: SanityImageLike;
  fallbackAlt: string;
};

export const SanityImage = ({ image, fallbackAlt, ...rest }: Props) => {
  const url = image?.url?.trim();
  if (!url) return null;
  const alt = image?.alt?.trim() || fallbackAlt;
  return <Image src={url} alt={alt} {...rest} />;
};
