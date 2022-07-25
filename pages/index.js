import { useState } from "react"
import Link from 'next/link'
import { Button, DropDown, Checkbox} from "~/components"

// export default function Home() {
// 	const [checked, setChecked] = useState(false)
// 	const ddItems = [
// 		{ label: 'Test', value: 'test' },
// 		{ label: 'Items', value: 'items' },
// 	]

// 	return (
// 		<div className="rounded-xl m-10 flex flex-col items-start">
// 			<p className="text-3xl text-gray-700 font-bold mb-5">
// 				Welcome to autotest !
// 			</p>
// 			<p className="text-gray-500">
// 				We are going to do some tests
// 			</p>
// 			<p className="text-gray-500">
// 				(dont worry this page will change)
// 			</p>
// 			<Button
// 				type={'secondary'}
// 				rounded={true}
// 				className={'mb-5'}
// 				onClick={() => console.log('click clack')}
// 			>
// 				Wesh le bouton
// 			</Button>
// 			<DropDown
// 				items={ddItems}
// 				width={'14rem'}
// 				onChange={(item) => console.log(item)}
// 			/>
// 			<Checkbox
// 				label={'Use this checkbox'}
// 				content={'so you can check things'}
// 				twoLines={true}
// 				onChange={setChecked}
// 				checked={checked}
// 			/> 
// 		</div>
// 	)
// }

export default function Home() {
	return (
		<div className="rounded-xl m-10 flex flex-col items-start">
			<h1 className="text-xl">Welcome to flaming' autotest</h1>
			<div className="flex flex-row">
				<div className="m-5">
					<Link href="/register">
						<a>
							<Button
								type={'primary'}
								rounded={true}
								className={'mb-5'}
							>
								Register
							</Button>
						</a>
					</Link>
				</div>
				<div className="m-5">
					<Link href="/login">
						<a>
							<Button
								type={'secondary'}
								rounded={true}
								className={'mb-5'}
							>
								Log in
							</Button>
						</a>
					</Link>
				</div>
			</div>
		</div>
	)
}