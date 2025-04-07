export const NotFoundPage = () => {
    return (
        <div className="h-screen flex items-center justify-center text-center px-4">
            <div>
                <h1 className="text-5xl font-bold text-[#F2F3F5] mb-4">404</h1>
                <p className="text-[#C4C8CC] text-lg mb-8">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-[#E4229B] !text-white rounded-[12px] text-sm font-semibold"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
};
