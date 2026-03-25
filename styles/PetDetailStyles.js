import { StyleSheet } from 'react-native';

const petDetailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7FAFC'
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 6
  },
  description: {
    fontSize: 16,
    color: '#2D3748',
    marginBottom: 16
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CBD5E0'
  },
  petName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8
  },
  petInfo: {
    fontSize: 15,
    color: '#2D3748',
    marginBottom: 4
  }
});

export default petDetailStyles;
