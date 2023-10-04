'use client'

import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FinnItem } from "@/components/finnItem";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";
import { useRef } from 'react';

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

	const [searchQuery, setSearchQuery] = useState<string>("");
	const searchInput = (
		<Input
			ref={inputRef}
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
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


	const [results, setResults] = useState<Result[]>([]);
	const makeApiCall = async (query: string) => {
		const response = await fetch(`/api/finn?query=${encodeURIComponent(query)}`, {
			method: "GET",
		});

		const data = await response.json();
		console.log(data.docs);
		setResults(data.docs || []);
	};

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