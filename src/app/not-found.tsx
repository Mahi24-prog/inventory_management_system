import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageXIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <div className="bg-slate-100 p-4 rounded-full">
        <PackageXIcon className="size-10 p-1 rounded-full" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-slate-700">Page not found</h2>
        <p className="text-sm text-slate-400 mt-1">
          The Page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
