import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { formatarMoeda } from '../../../utils/FormatarMoeda';
import { CalculoResponse } from '../models/CalculoResponse';
import { CalculoSalarioState } from '../models/CalculoSalarioState';

// Estilização
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  logo: {
    height: 35,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Helvetica-Bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  column: {
    width: '50%',
  },
  card: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#F9FAFB',
    minHeight: 60,
  },
  cardRed: {
    backgroundColor: '#FEF2F2',
  },
  cardGreen: {
    backgroundColor: '#F0FDF4',
  },
  label: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 5,
    fontFamily: 'Helvetica',
  },
  value: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  valueRed: {
    color: '#DC2626',
  },
  valueGreen: {
    color: '#16A34A',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 4,
  },
  detailsTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#1E40AF',
    fontFamily: 'Helvetica-Bold',
  },
  detailsItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#1E40AF',
    fontFamily: 'Helvetica',
  },
});

// Tipagem dos dados que serão utilizados para gerar o PDF
interface CalcularSalarioPdfProps {
  resultado: CalculoResponse;
  state: CalculoSalarioState;
}

function Holerite({ resultado, state }: CalcularSalarioPdfProps) {
  
  const logoUrl = 'https://ik.imagekit.io/vzr6ryejm/rh/logo_rh_pdf.png?updatedAt=1730503750849';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image 
            style={styles.logo} 
            src={logoUrl}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Holerite - {state.colaborador.nome}
            </Text>
          </View>
        </View>
        
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.card}>
              <Text style={styles.label}>Salário Base</Text>
              <Text style={styles.value}>
                {formatarMoeda(resultado.salario)}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.card}>
              <Text style={styles.label}>Horas Extras</Text>
              <Text style={styles.value}>
                {formatarMoeda(resultado.valorTotalHorasExtras)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <View style={[styles.card, styles.cardRed]}>
              <Text style={styles.label}>Descontos</Text>
              <Text style={[styles.value, styles.valueRed]}>
                {formatarMoeda(resultado.totalDescontos)}
              </Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={[styles.card, styles.cardGreen]}>
              <Text style={styles.label}>Salário Líquido</Text>
              <Text style={[styles.value, styles.valueGreen]}>
                {formatarMoeda(resultado.salarioLiquido)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Detalhes do Cálculo</Text>
          <Text style={styles.detailsItem}>
            • Horas extras registradas: {state.totalHorasExtras} horas
          </Text>
          {state.totalHorasExtras > 0 && (
            <Text style={styles.detailsItem}>
              • Valor por hora extra: {formatarMoeda(resultado.valorHoraExtra)}
            </Text>
          )}
          <Text style={styles.detailsItem}>
            • INSS: {formatarMoeda(resultado.inss)}
          </Text>
          <Text style={styles.detailsItem}>
            • IRRF: {formatarMoeda(resultado.irrf)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Holerite;