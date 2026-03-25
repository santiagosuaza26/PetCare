import { StyleSheet } from 'react-native';

const tipsStyles = StyleSheet.create({
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
    marginBottom: 14,
    lineHeight: 22
  },
  counterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6
  },
  tipDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  },
  nextButtonWrapper: {
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default tipsStyles;
