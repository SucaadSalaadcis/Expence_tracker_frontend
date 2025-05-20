import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { FaMoneyBillWave } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";

const Sidebar = ({ isOpen, toggleSidebar }) => {


    const menuItems = [
        { name: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
        { name: 'Users', icon: <HiUsers />, path: '/users' , add_path: '/createUser'},
        { name: 'Expenses', icon: <FaMoneyBillWave />, path: '/expenses', add_path: '/createE', edit_path: '/editE/' },
        { name: 'Logout', icon: <MdLogout />, path: '/logout' },
    ];

    return (
        <>

            {/* Sidebar */}
            <div className={`fixed z-30 top-0 left-0 h-full w-64 bg-black transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:static md:z-auto`}>
                <div className="py-6 text-center text-[#517cda] text-2xl font-bold cursor-pointer">
                    💰 XTracker
                </div>
                <nav className="flex flex-col px-4 space-y-2">
                    {menuItems.map((item, idx) => {
                        // Custom active check:
                        const isActive =
                            location.pathname === item.path ||
                            (item.add_path && location.pathname === item.add_path) ||
                            (item.name === 'Expenses' && location.pathname.startsWith('/editE/'));

                        return (
                            <NavLink
                                key={idx}
                                to={item.path}
                                onClick={toggleSidebar}
                                className={`my-link text-white flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors duration-300 hover:text-gray-700 ${isActive ? 'bg-[#155DFC]' : ''
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
