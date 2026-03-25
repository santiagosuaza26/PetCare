import { StyleSheet } from 'react-native';

const petDetailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 4,
    letterSpacing: 0.2
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 18,
    lineHeight: 22
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 4
  },
  petName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 10
  },
  petInfo: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 22
  }
});

export default petDetailStyles;
