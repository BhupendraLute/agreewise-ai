"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function AgreementCard({ agreement }: { agreement: any }) {
  const router = useRouter();

  async function handleDelete() {
    try {
      const res = await fetch(`/api/agreement/${agreement._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete agreement");
      }
    } catch (error) {
      console.error("Error deleting agreement:", error);
    }
  }

  return (
    <div className="relative bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
      <Link href={`/dashboard/agreements/agreement/${agreement._id}`}>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          {agreement.title}
        </h2>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {agreement.summary || agreement.clauses?.[0]?.simplified_text}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-4">
          <span className="px-2 py-1 rounded-md bg-muted text-foreground">
            {agreement.category}
          </span>
          <span>
            {new Date(agreement.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </Link>

      <div className="absolute top-5 right-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Agreement</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <b>{agreement.title}</b>? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
