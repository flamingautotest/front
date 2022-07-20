import { Button, DropDown } from "~/components"

export default function Home() {
	const ddItems = [
		{ label: 'Test', value: 'test' },
		{ label: 'Items', value: 'items' },
	]

	return (
		<div className="bg-gray-200 rounded-xl shadow border p-8 m-10">
			<p className="text-3xl text-gray-700 font-bold mb-5">
				Welcome to autotest !
			</p>
			<p className="text-gray-500">
				We are going to do some tests
			</p>
			<p className="text-gray-500">
				(dont worry this page will change)
			</p>
			<Button
				type={'secondary'}
				rounded={true}
				onClick={() => console.log('click clack')}
			>
				Wesh le bouton
			</Button>
			<DropDown
				items={ddItems}
				onChange={(item) => console.log(item)}
			/>
		</div>
	)
}
