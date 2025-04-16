export function Button({ children, variant = "ghost", size = "icon", ...props }) {
    const baseStyles = "p-2 rounded-md transition-all";
    const variants = {
      ghost: "hover:bg-gray-200",
    };
    const sizes = {
      icon: "w-10 h-10 flex items-center justify-center",
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${sizes[size]}`} {...props}>
        {children}
      </button>
    );
  }
  