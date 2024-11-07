import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Oportunidade from '../../../models/Oportunidade'
import { formatarMoeda } from '../../../utils/FormatarMoeda'
import { agruparOportunidadesPorProduto, agruparOportunidadesPorStatus, agruparVendasPorUsuario } from './DashboardData'

// Props do componente
interface DashboardProps{
    oportunidades: Oportunidade[]
}

// Cores - Gráfico de Pizza
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// Cores - Gráfico de Barras
const BAR_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard({oportunidades}: DashboardProps) {

  const oportunidadesPorStatus = agruparOportunidadesPorStatus(oportunidades);

  const oportunidadesPorProduto = agruparOportunidadesPorProduto(oportunidades);

  const vendasPorUsuario = agruparVendasPorUsuario(oportunidades);

  return (
    <div className="p-4 bg-gray-200">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Gráfico 01 Oportunidades por Status */}

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Oportunidades por Status</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={oportunidadesPorStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {oportunidadesPorStatus.map((_item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} oportunidades`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 02 - Oportunidades por Produto */}

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Faturamento por Produto - Oportunidades Fechadas</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oportunidadesPorProduto}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  className='text-sm'
                />
                <YAxis 
                  tickFormatter={formatarMoeda} 
                  className='text-sm'
                  width={100}
                  domain={[0, 150000]}
                  tickCount={15}
                />
                <Tooltip formatter={formatarMoeda} cursor={{fill: 'transparent'}}/>
                <Legend />
                <Bar 
                  dataKey="valor" 
                  name="Produtos"  
                  
                >
                  {oportunidadesPorProduto.map((_entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={BAR_COLORS[index % BAR_COLORS.length]} 
                    />
                  ))}
                  <LabelList 
                    dataKey="valor" 
                    position="top" 
                    formatter={formatarMoeda}
                    style={{ fontSize: '12px' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 03 - Vendas por Usuário */}

        <div className="bg-white rounded-lg shadow-lg p-4 md:col-span-2">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Vendas por Usuário</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vendasPorUsuario}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatarMoeda} className='text-sm' width={100}/>
                <Tooltip formatter={formatarMoeda} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="Total de Vendas (R$)" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard
