
import React, { useEffect, useState } from 'react';
import image from "./assets/images/image.svg"
function URLShortener() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const backgroundStyle = {
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "45% 7%"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:3000/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setShortUrl(`http://localhost:3000/${data.short_url}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={backgroundStyle} className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL here"
                        disabled={loading}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" disabled={loading} className="w-full bg-custom-purple-500 hover:bg-custom-purple-700 text-white font-bold py-2 px-4 rounded">
                        Shorten URL
                    </button>
                </form>
                {loading && <div className="flex justify-center items-center p-4">
                    <div className="spinner"></div>
                </div>}

                {shortUrl && !loading && (
                    <div className="mt-6 p-4 bg-custom-purple-100 rounded-lg">
                        <p className="text-sm text-center font-medium text-gray-700">Shortened URL:</p>
                        <div className="mt-2 flex justify-between items-center">
                            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 break-all">
                                {shortUrl}
                            </a>
                            <div style={{cursor: 'pointer'}}
                                onClick={() => navigator.clipboard.writeText(shortUrl)}
                                >
                               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6C63FF" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                </svg>


                            </div>
                        </div>
                    </div>
                )}
                {error && <p className="text-center mt-3 text-red-500">{error}</p>}
            </div>
        </div>
    );
}

export default URLShortener;
