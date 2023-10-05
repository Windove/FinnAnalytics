'use client'

import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { FinnItem } from "@/components/finnItem";
import { SearchIcon } from "@/components/icons";
import { useRef } from 'react';
import { Pagination, Button, Input } from "@nextui-org/react";


interface Result {
	heading: string;
	id: number;
	image: {
		url: string;
	}
	price: {
		amount: number;
	}
}

export default function Home() {
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// states
	const [page, setPage] = useState<number>(1);
	const [sort, setSort] = useState<number>(3);
	const [location, setLocation] = useState<number>(0.20061);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [results, setResults] = useState<Result[]>([]);
	const [totMatches, setTotMatches] = useState<number>(0);

	const searchInput = (
		<Input
			ref={inputRef}
			value={searchQuery}
			onChange={(e: any) => setSearchQuery(e.target.value)}
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	const makeApiCall = async (query: string) => {
		const response = await fetch(`/api/finn?query=${encodeURIComponent(query)}&sort=${sort}&page=${page}&location=${location}`, {
			method: "GET",
		});

		const data = await response.json();

		console.log(data.docs);
		setTotMatches(data.metadata.result_size.match_count);
		setResults(data.docs || []);
		console.log(totMatches);
	};

	useEffect(() => {
		makeApiCall(searchQuery);
	}, [page, searchQuery]);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Finn&nbsp;</h1>
				<h1 className={title({ color: "cyan" })}>Analytics&nbsp;</h1>
			</div>

			<form onSubmit={(e) => {
				e.preventDefault();
				buttonRef.current?.click();
				makeApiCall(searchQuery);
				inputRef.current?.focus();
			}}>
				<div className="flex items-center gap-4">
					{searchInput}
					<Button ref={buttonRef} type="submit" color="primary" variant="ghost">Search</Button>
				</div>
			</form>


			{results.length > 0 && (
				<div className="mt-8">
					{/* Grid container */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{results.map((result, index) => (
							<FinnItem key={index} itemData={result} />
						))}
					</div>
					<div className="flex justify-center mt-12">
						<Pagination
							showControls
							siblings={2}
							total={Math.ceil(totMatches / 50)}
							initialPage={1}
							size={"lg"}
							variant="faded"
							onChange={
								(e) => {
									setPage(e);
								}
							}
						/>
					</div>
				</div>
			)}
			{results.length == 0 && (
				<div>
					<h1>No Results</h1>
				</div>
			)}

		</section>
	);
}