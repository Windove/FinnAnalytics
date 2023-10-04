// This is your server-side API code
export async function POST(req: Request) {
    const res = await fetch(
        `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&location=0.20061&q=iphone&sort=relevant&page=1&vertical=BAP`
    );
    const data = await res.json();
    return new Response(JSON.stringify(data))
}
