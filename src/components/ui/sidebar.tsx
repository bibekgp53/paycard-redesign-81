
import * as React from "react"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate, useLocation } from "react-router-dom"

export interface SidebarProps {
  children?: React.ReactNode
  className?: string
  collapsed?: boolean
  defaultCollapsed?: boolean
  variant?: "default" | "collapsed"
}

const SidebarContext = React.createContext<{
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}>({
  collapsed: false,
  setCollapsed: () => {},
})

const Sidebar = React.forwardRef<
  HTMLDivElement,
  SidebarProps
>(({
  children,
  className,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  variant = "default",
  ...props
}, ref) => {
  const [internalCollapsed, setInternalCollapsed] = React.useState<boolean>(defaultCollapsed)
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed
  
  const setCollapsed = React.useCallback((value: boolean) => {
    setInternalCollapsed(value)
  }, [])

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div
        data-collapsed={collapsed ? "" : undefined}
        className={cn(
          "group/sidebar shrink-0 flex flex-col border-r bg-white dark:bg-gray-950 transition-width duration-300",
          collapsed || variant === "collapsed" ? "w-16" : "w-64",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

const SidebarTrigger = () => {
  const { collapsed, setCollapsed } = React.useContext(SidebarContext)
  
  return (
    <button
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => setCollapsed(!collapsed)}
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

const SidebarContent = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      {children}
    </div>
  )
}

const SidebarHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("p-4 border-b", className)}>
      {children}
    </div>
  )
}

const SidebarFooter = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("p-4 border-t mt-auto", className)}>
      {children}
    </div>
  )
}

interface SidebarGroupProps {
  children?: React.ReactNode
  className?: string
  title?: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

const SidebarGroup = ({
  children,
  className,
  title,
  collapsible = false,
  defaultCollapsed = true,
}: SidebarGroupProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const { collapsed } = React.useContext(SidebarContext)

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={cn("py-2", className)}>
      {title && (
        <div className="flex items-center px-3 py-1.5">
          {collapsible ? (
            <button
              onClick={handleToggle}
              className="flex items-center w-full text-left"
            >
              <div className="flex items-center flex-1">
                {!collapsed && (
                  <>
                    {isCollapsed ? (
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1 text-gray-500" />
                    )}
                    <span className="text-xs font-medium uppercase text-gray-500">
                      {title}
                    </span>
                  </>
                )}
              </div>
            </button>
          ) : (
            <>
              {!collapsed && (
                <span className="text-xs font-medium uppercase text-gray-500 px-1.5">
                  {title}
                </span>
              )}
            </>
          )}
        </div>
      )}
      {(!collapsible || !isCollapsed) && <div>{children}</div>}
    </div>
  )
}

const SidebarGroupLabel = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const { collapsed } = React.useContext(SidebarContext)
  
  if (collapsed) return null
  
  return (
    <div className={cn("px-3 py-1.5", className)}>
      <span className="text-xs font-medium uppercase text-gray-500">
        {children}
      </span>
    </div>
  )
}

const SidebarGroupContent = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const SidebarMenu = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <ul className={cn("grid gap-1 px-2", className)}>
      {children}
    </ul>
  )
}

const SidebarMenuItem = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <li className={className}>
      {children}
    </li>
  )
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const { collapsed } = React.useContext(SidebarContext)
  const Comp = asChild ? React.Fragment : "button"
  const childProps = asChild ? {} : props
  
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md p-2 w-full",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "text-sm font-medium text-gray-700 dark:text-gray-300",
        collapsed && "justify-center",
        className
      )}
      {...childProps}
    >
      {asChild ? props.children : 
        <>
          {props.children}
        </>
      }
    </Comp>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarItem = ({ 
  icon, 
  label, 
  active = false,
  href,
  onClick,
  className
}: { 
  icon?: React.ReactNode,
  label?: React.ReactNode,
  active?: boolean,
  href?: string,
  onClick?: () => void,
  className?: string
}) => {
  const { collapsed } = React.useContext(SidebarContext)
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleClick = () => {
    if (href) {
      navigate(href)
    } else if (onClick) {
      onClick()
    }
  }
  
  const isActive = active || (href && location.pathname.startsWith(href))
  
  return (
    <li>
      <button
        onClick={handleClick}
        className={cn(
          "flex items-center rounded-md w-full p-2",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "text-sm font-medium",
          isActive 
            ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20" 
            : "text-gray-700 dark:text-gray-300",
          collapsed && "justify-center",
          className
        )}
      >
        {icon && <span className={cn("shrink-0", !collapsed && "mr-2")}>{icon}</span>}
        {!collapsed && label}
      </button>
    </li>
  )
}

export {
  Sidebar,
  SidebarContext,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarItem,
}
