import { StyleSheet } from 'react-native';

const petListStyles = StyleSheet.create({
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
  listContent: {
    paddingBottom: 24
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
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
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92
  },
  petName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6
  },
  petNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  petEmoji: {
    fontSize: 21,
    marginBottom: 6
  },
  petInfo: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 28,
    fontSize: 15
  }
});

export default petListStyles;
