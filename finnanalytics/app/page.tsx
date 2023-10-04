'use client'

import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FinnItem } from "@/components/finnItem";

interface Result {
	heading: string;
}

export default function Home() {
	const [results, setResults] = useState<Result[]>([]);

	const makeApiCall = async () => {
		const response = await fetch("/api/finn", {
			method: "POST",
			body: JSON.stringify({ hello: "world" }),
		});

		const data = await response.json();
		console.log(data.docs)
		setResults(data.docs || []);
	};

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					websites regardless of your design experience.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Beautiful, fast and modern React UI library.
				</h2>
			</div>

			<div className="flex gap-3">
				<Link
					isExternal
					as={NextLink}
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					as={NextLink}
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link>
			</div>

			<div className="mt-8">
				<Snippet hideSymbol hideCopyButton variant="flat">
					<span>
						<Button onClick={makeApiCall}>Make Call</Button>
					</span>
				</Snippet>
			</div>

			{results.length > 0 && (
				<div className="mt-8">
					<h3>Results:</h3>
					<ul>
						{results.map((results) => (
							FinnItem({ itemData: results })
						))}
					</ul>
				</div>
			)}

		</section>
	);
}