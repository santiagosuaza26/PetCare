import { StyleSheet } from 'react-native';

const registerPetStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFDF7'
  },
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2F855A',
    marginBottom: 6
  },
  description: {
    fontSize: 16,
    color: '#276749',
    marginBottom: 16
  },
  keyboardWrapper: {
    flex: 1
  },
  scrollContainer: {
    paddingBottom: 24
  },
  fieldBlock: {
    marginBottom: 14
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
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827'
  },
  helperText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 16
  },
  submitButton: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 6
  },
  submitButtonEnabled: {
    backgroundColor: '#2F855A'
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF'
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  }
});

export default registerPetStyles;
