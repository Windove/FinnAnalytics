export default async function Page () {
    const res = await fetch(
        `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_BAP_COMMON&location=0.20061&q=iphone&sort=relevant&page=1&vertical=BAP`
    );
    const data = await res.json();
    console.log(data);

    return (
        <div>
            <h1>API Test</h1>
            <p>API Test</p>
        </div>
    );
}