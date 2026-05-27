import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="glass-surface flex size-24 items-center justify-center rounded-[2rem]">
        <Image
          src="/logo-mark.png"
          alt=""
          width={58}
          height={54}
          className="h-12 w-auto opacity-80"
          priority
        />
      </div>
    </div>
  );
}
