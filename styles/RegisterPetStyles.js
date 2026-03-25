import { StyleSheet } from 'react-native';

const registerPetStyles = StyleSheet.create({
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
  keyboardWrapper: {
    flex: 1
  },
  scrollContainer: {
    paddingBottom: 24
  },
  fieldBlock: {
    marginBottom: 15
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 15,
    color: '#111111',
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1
  },
  inputFocused: {
    borderColor: '#111111',
    borderWidth: 1.5,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2
  },
  helperText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 18,
    lineHeight: 20
  },
  submitButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4
  },
  submitButtonEnabled: {
    backgroundColor: '#111111'
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  submitButtonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.94
  }
});

export default registerPetStyles;
