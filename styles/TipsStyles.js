import { StyleSheet } from 'react-native';

const tipsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0FFF4'
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#22543D',
    marginBottom: 6
  },
  description: {
    fontSize: 16,
    color: '#2F855A',
    marginBottom: 16
  },
  listContent: {
    paddingBottom: 20
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#C6F6D5'
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#22543D',
    marginBottom: 6
  },
  tipDescription: {
    fontSize: 14,
    color: '#2F855A'
  }
});

export default tipsStyles;
