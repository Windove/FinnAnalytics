// Finn API code
export async function GET(req: Request) {
    const url = new URL(req.url);

    // Get the query parameters
    const query = url.searchParams.get("query") || ""; // default to something with no results if no query is provided
    const sort = url.searchParams.get("sort") || "0"; // default to "relevant" if no sort is provided
    const page = url.searchParams.get("page") || "1"; // default to page 1 if not provided
    const location = url.searchParams.get("location") || 0; // default to Oslo if not provided

    let apiUrl: string;
    // apiURL base: https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&location=0.20061&q=&sort=3&page=1&vertical=BAP$rows=100
    if (location == "0") {
        apiUrl = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&q=${encodeURIComponent(query)}&sort=${encodeURIComponent(sort)}&page=${encodeURIComponent(page)}&vertical=BAP`;
    } else {
        apiUrl = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&location=${encodeURIComponent(location)}&q=${encodeURIComponent(query)}&sort=${encodeURIComponent(sort)}&page=${encodeURIComponent(page)}&vertical=BAP`;
    }

    console.log(apiUrl);
    const res = await fetch(apiUrl);
    const data = await res.json();

    return new Response(JSON.stringify(data))
}

