export default function PageHeader({title, subtitle, children}) {

    return (
        <div className="flex flex-col w-full justify-center items-center mb-20">
            <h1 className="text-4xl font-bold mb-10">{title}</h1>
            <p className="text-2xl italic">{subtitle}</p>
            {children}
        </div>
    )
}