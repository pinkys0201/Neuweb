
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
