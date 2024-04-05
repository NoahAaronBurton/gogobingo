export default function Navbar({ setOpenPage }) {

    const NavItem = ({ name, funct }) => {
        return (
            <button onClick={funct} className="px-6 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-700">
                {name}
            </button>
        );
    }

    return (
        <nav className="flex justify-between w-full p-4">
          <div className="flex space-x-4">
            <NavItem name="Home" funct={() => setOpenPage("landing")} />
            <NavItem name="Create a Board" funct={() => setOpenPage("board-editor")} />
          </div>
         
        </nav>
    )
}