export default function Navbar() {

    const NavItem = ({ name, funct }) => {
        return (
            <a onClick={funct} className="px-6 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-700">
                {name}
            </a>
        );
    }

    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Create a Board" />
          </div>
         
        </nav>
    )
}