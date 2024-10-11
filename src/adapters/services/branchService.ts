import { getBranchIdQuery } from '../queries/branchQuery';

export const getBranchIdService = async (id: number) => {
	try {
		const res = await getBranchIdQuery(id);
		return res;
	} catch (err) {
		throw err;
	}
};
