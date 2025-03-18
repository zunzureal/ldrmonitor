export default function ChatwithmeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<p className="font-kanit font-normal text-[15px]">**Reminder** This page and chat is on under development</p>
				<p className="font-kanit font-normal text-[15px]">in case if you dont see a chat bar scroll down a liitle bit :D</p>
				{children}
			</div>
		</section>
	);
}
