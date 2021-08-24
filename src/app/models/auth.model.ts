export enum EAuthError {
	DEFAULT = 'DEFAULT',
	EMAIL_EXISTS = 'EMAIL_EXISTS',
	OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
	TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
	WEAK_PASSWORD = 'WEAK_PASSWORD : Password should be at least 6 characters'
}

export interface ISignupResponse {
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
}

export interface IAuthError {
	error: {
		code: number;
		message: EAuthError;
		errors: {
			domain: string;
			message: EAuthError;
			reason: string;
		}[];
	};
}
