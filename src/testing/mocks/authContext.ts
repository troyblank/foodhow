/* istanbul ignore file */
import { mockUser } from './user';
import { type AuthContextType } from '../../types';

export const mockAuthContext = (overrides: Partial<AuthContextType> = {}): AuthContextType => ({
    attemptToSignIn: jest.fn(),
    user: mockUser(),
    ...overrides
});
