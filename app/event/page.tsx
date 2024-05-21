import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function EventPage() {
	return (
		<div>
			<h1 className={title({ class: "bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-400" })}>Event</h1>
			<div className="pt-8">
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">Daily Mix</p>
						<small className="text-default-500">12 Tracks</small>
						<h4 className="font-bold text-large">Frontend Radio</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="Thai_tunes.png"
							width={270}
						/>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}
