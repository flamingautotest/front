import { Button,DropDowns } from "~/components"
/**test pour Dropdowns */
const links = [
    {label:"Account", to:"/"},
    {label:"dd", to:"/"}
]

export default function Home() {
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
			<Button>Click me</Button>
			<DropDowns links={links} ></DropDowns>

		</div>
	)
}
