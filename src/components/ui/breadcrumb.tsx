
import * as React from "react"
import { ChevronRight, MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    const navigate = useNavigate();

    return (
      <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <li className="inline-flex items-center gap-1.5">
                {item.isCurrentPage ? (
                  <span
                    role="link"
                    aria-disabled="true"
                    aria-current="page"
                    className="font-normal text-foreground"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    onClick={() => item.path && navigate(item.path)}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </button>
                )}
              </li>
              {index < items.length - 1 && (
                <li
                  role="presentation"
                  aria-hidden="true"
                  className="[&>svg]:size-3.5"
                >
                  <ChevronRight />
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }
