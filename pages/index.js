import { Button } from "~/components"

export default function Home() {
	return (
		<div className="rounded-xl mt-10 flex flex-col items-start">
			<h1 className="text-xl">Welcome to flaming' autotest</h1>
			<Button
				className={'mt-5'}
			>
				Open app
			</Button>
		</div>
	)
}