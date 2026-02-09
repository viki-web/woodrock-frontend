import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
            <h1 className="reveal-up" style={{ fontSize: '120px', marginBottom: '20px' }}>404</h1>
            <h2 className="reveal-up" style={{ marginBottom: '40px' }}>Page Not Found</h2>
            <p className="reveal-up" style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                The page you looking for might have been removed, had its name changed or is temporarily unavailable.
            </p>
            <Link href="/" className="cta-button reveal-up">
                Back to Homepage
            </Link>
        </div>
    );
}
