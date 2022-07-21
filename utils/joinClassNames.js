export default function joinClassNames(...classes) {
	return classes.filter(Boolean).join(' ')
}