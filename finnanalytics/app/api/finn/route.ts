// This is your server-side API code
export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "dosjaklthejkwllnjfkd"; // default to "iphone" if no query is provided

    const res = await fetch(
        `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&location=0.20061&q=${encodeURIComponent(query)}&sort=relevant&page=1&vertical=BAP`
    );
    const data = await res.json();
    return new Response(JSON.stringify(data))
}
