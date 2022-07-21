import { useState } from "react"
import { Button, DropDown, Checkbox} from "~/components"

export default function Home() {
	const [checked, setChecked] = useState(false)
	const ddItems = [
		{ label: 'Test', value: 'test' },
		{ label: 'Items', value: 'items' },
	]

	return (
		<div className="rounded-xl m-10 flex flex-col items-start">
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
				className={'mb-5'}
				onClick={() => console.log('click clack')}
			>
				Wesh le bouton
			</Button>
			<DropDown
				items={ddItems}
				onChange={(item) => console.log(item)}
			/>
			<Checkbox
				label="Use this checkbox"
				content="so you can check things"
				twoLines={true}
				onChange={setChecked}
				checked={checked}
			/> 
		</div>
	)
}
