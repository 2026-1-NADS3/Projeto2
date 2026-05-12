import { UserRoundSearch, ShieldQuestionMark, LogOut, Calendar, LayoutDashboard, IdCard } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'

const menu = [
    { label: 'Dashboard', icon: LayoutDashboard, path: "/home" },
    { label: 'Minha Agenda', icon: Calendar, path: "/agenda" },
    { label: 'Pacientes', icon: UserRoundSearch, path: "/pacientes" },
    { label: 'Equipe', icon: IdCard, path: "/equipe" },
]

export default function Sidebar() {
    const location = useLocation()
    const { setNovoPacienteAberto, setNovaConsultaAberto } = useModal()

    return (
        <div className='h-screen flex flex-col w-64 bg-[#005073] sticky top-0'>
            {/* Topo da Side */}
            <div className='p-6'>
                <h1 className='text-white text-2xl'>Instituto Maya</h1>
                <p className='text-[#BCC9CA]'>Clínica de RPG</p>
            </div>

            {/* Menu */}
            {menu.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-6 py-3 text-white ${location.pathname === item.path ? 'bg-white/10 border-l-4 border-white' : ''}`}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </Link>
            ))}

            {/* Rodapé da Side */}
            <div className='mt-auto mb-4 flex flex-col gap-2 px-4'>
                <button
                    onClick={() => setNovaConsultaAberto(true)}
                    className='w-full text-white text-center px-4 py-3 bg-gradient-to-r from-[#0077a8] to-[#00a878] rounded-full hover:scale-105 hover:shadow-lg transition-all duration-200'
                >
                    Nova Consulta
                </button>
                <button
                    onClick={() => setNovoPacienteAberto(true)}
                    className='w-full text-white text-center px-4 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors'
                >
                    Novo Paciente
                </button>
            </div>
        </div>
    )
}
