import { StyleSheet } from 'react-native';

const petListStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FB'
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 6
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    marginBottom: 18
  },
  listContent: {
    paddingBottom: 18
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D7E3F4'
  },
  petName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D3557',
    marginBottom: 6
  },
  petInfo: {
    fontSize: 14,
    color: '#4A5568'
  },
  emptyText: {
    textAlign: 'center',
    color: '#4A5568',
    marginTop: 24,
    fontSize: 15
  }
});

export default petListStyles;
