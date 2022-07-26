import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { joinClassNames } from '~/utils'

export default function DropDown(props) {
	const {
		items = [],
		onChange = () => {},
		className = '',
		width = 'auto',
	} = props

	const [activeItem, setActiveItem] = useState(items[0] || { label: '', value: '' })

	const switchActiveItem = (item) => {
		setActiveItem(item)
		onChange(item.value)
	}

	return (
		<Menu
			as='div'
			style={{ width }}
			className={joinClassNames(`relative inline-block text-left`, className)}
		>
			<Menu.Button className='inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
				{ activeItem.label }
				<ChevronDownIcon
					className='-mr-1 ml-2 h-5 w-5'
					aria-hidden='true'
				/>
			</Menu.Button>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items
					style={{ width }}
					className={`origin-top-right absolute z-50 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer`}
				>
					{items.map((item, index) =>(
						<Menu.Item key={index} onClick={() => switchActiveItem(item)}>
							<div className={joinClassNames(activeItem.value === item.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer')}>
								{item.label}
							</div>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
