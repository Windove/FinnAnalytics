'use client'

import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { FinnItem } from "@/components/finnItem";
import { SearchIcon } from "@/components/icons";
import { useRef } from 'react';
import { Pagination, Button, Input, Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Locations, Sort, SearchKeys } from "@/lib/constants";


interface Result {
	heading: string;
	id: number;
	image: {
		url: string;
	}
	price: {
		amount: number;
	}
	canonical_url: string;
}

export default function Home() {
	// refs
	const inputRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	// states
	const [page, setPage] = useState<number>(1);
	const [sort, setSort] = useState<number>(0);
	const [location, setLocation] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [results, setResults] = useState<Result[]>([]);
	const [totMatches, setTotMatches] = useState<number>(0);
	const [searchkey, setSearchKey] = useState<{ value: string, vertical: string }>({
		value: SearchKeys[0].value,
		vertical: SearchKeys[0].vertical
	});

	// function to call api
	const makeApiCall = async (query: string) => {
		const response = await fetch(`/api/finn?searchkey=${encodeURIComponent(searchkey.value)}&query=${encodeURIComponent(query)}&sort=${sort}&page=${page}&location=${location}&vertical=${encodeURIComponent(searchkey.vertical)}`, {
			method: "GET",
		});

		const data = await response.json();

		console.log(data.docs);
		setTotMatches(data.metadata.result_size.group_count);
		setResults(data.docs || []);
		console.log(totMatches);
	};

	// update search when inputs change
	useEffect(() => {
		makeApiCall(searchQuery);
	}, [page, sort, location, searchkey, searchQuery]);

	// search input
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

			<div className="flex gap-4 mt-4 w-1/2">
				<Select
					className="max-w-xs"
					label="Sort by"
					defaultSelectedKeys={["0"]}
					disallowEmptySelection
					onSelectionChange={(e) => {
						const sortValue = Array.from(e)[0];
						setSort(Number(sortValue));
					}}

				>
					{Sort.map((sort) => (
						<SelectItem
							key={sort.value}
							value={sort.value}
							textValue={sort.label}
						>
							{sort.label}
						</SelectItem>
					))}
				</Select>

				<Select
					className="max-w-xs"
					label="Location"
					defaultSelectedKeys={["0"]}
					disallowEmptySelection
					onSelectionChange={(e) => {
						let locationValue = Array.from(e)[0].toString();
						if (
							searchkey.value !== "BAP_COMMON" &&
							searchkey.value !== "REALESTATE_HOMES"
						) {
							locationValue = locationValue.replace('0.', '');
						}
						setLocation(Number(locationValue));
					}}
					
				>
					<SelectSection showDivider>
						<SelectItem key="0" value="all" textValue="All">
							All
						</SelectItem>
					</SelectSection>
					<SelectSection>
						{Locations.map((location) => (
							<SelectItem
								key={location.value}
								value={location.value}
								textValue={location.label}
							>
								{location.label}
							</SelectItem>
						))}
					</SelectSection>
				</Select>

				<Select
					className="max-w-xs"
					label="Market type"
					defaultSelectedKeys={["0"]}
					disallowEmptySelection
					onSelectionChange={(e) => {
						const searchkeyValue = Array.from(e)[0];
						setSearchKey({
							value: SearchKeys[Number(searchkeyValue)].value,
							vertical: SearchKeys[Number(searchkeyValue)].vertical
						});
					}}
				>
					{SearchKeys.map((searchkey, index) => (
						<SelectItem
							key={index}
							value={searchkey.value}
							textValue={searchkey.label}
						>
							{searchkey.label}
						</SelectItem>
					))}
				</Select>
			</div>

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
							total={Math.min(Math.ceil(totMatches / 50), 50)}
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