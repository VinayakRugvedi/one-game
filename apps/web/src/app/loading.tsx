import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="bg-background fixed inset-0 flex flex-col items-center justify-center gap-4"
      role="status"
    >
      <Image
        src="/plain-right-flower-logo.svg"
        alt="One Game Loading"
        width={45}
        height={45}
      />
      <p className="italic text-lg">It&apos; happening...</p>
    </div>
  );
}
