import Link from "next/link";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Agreement } from "@/models/agreement.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PAGE_SIZE = 6; // number of cards per page

export default async function AgreementsPage({ searchParams }: { searchParams: { page?: string } }) {
  await connectToDatabase();

  // check session
  const session = await getServerSession(authOptions);
  if (!session || session === null) {
    redirect("/auth/signin");
  }

  // page number
  const currentPage = parseInt(searchParams.page || "1", 10);

  // total agreements count
  const totalAgreements = await Agreement.countDocuments({ user: session.user.id });

  // agreements for this page
  const agreements = await Agreement.find({ user: session.user.id })
    .sort({ createdAt: -1 })
    .skip((currentPage - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);

  const totalPages = Math.ceil(totalAgreements / PAGE_SIZE);

  return (
    <div className="max-w-6xl mx-auto py-7 px-4">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        Recent Agreements
      </h1>

      {agreements.length === 0 ? (
        <p className="text-muted-foreground">
          You haven’t uploaded any agreements yet.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {agreements.map((agreement: any) => (
              // agreement card
              <Link
                key={agreement._id}
                href={`/dashboard/agreements/agreement/${agreement._id}`}
                className="block bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  {agreement.title}
                </h2>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                  {agreement.summary || agreement.clauses[0]?.simplified_text}
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
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${Math.max(1, currentPage - 1)}`}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`?page=${i + 1}`}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={`?page=${Math.min(totalPages, currentPage + 1)}`}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
