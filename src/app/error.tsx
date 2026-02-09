'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container" style={{ padding: '200px 0', textAlign: 'center' }}>
            <h1 className="reveal-up" style={{ fontSize: '120px', marginBottom: '20px' }}>ERROR</h1>
            <h2 className="reveal-up" style={{ marginBottom: '40px' }}>Something went wrong!</h2>
            <p className="reveal-up" style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
                We apologize for the inconvenience. An unexpected error has occurred while processing your request.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <button onClick={() => reset()} className="cta-button reveal-up">
                    Try Again
                </button>
                <Link href="/" className="footer-outline-btn reveal-up" style={{ padding: '15px 30px' }}>
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
}
