export default function PageHeader({title, subtitle, children}) {

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-4xl font-bold mb-10">{title}</h1>
            <p>{subtitle}</p>
            {children}
        </div>
    )
}