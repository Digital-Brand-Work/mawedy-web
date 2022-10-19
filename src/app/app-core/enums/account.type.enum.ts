export type AccountType = AccountTypeEnum.MAIN | AccountTypeEnum.BRANCH

export enum AccountTypeEnum {
	MAIN = 'Main',
	BRANCH = 'Branch',
}

export const accountTypes = Object.keys(AccountTypeEnum)
