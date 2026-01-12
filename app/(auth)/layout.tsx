export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f5f2ea] p-4">
            {/* bg-[#f5f2ea] gives it that "old paper/library" feel 
         flex items-center justify-center centers the form perfectly
      */}
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}