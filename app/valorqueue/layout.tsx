export default function ValorQueueLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col ml-128 items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				{children}
			</div>
		</section>
	);
}
