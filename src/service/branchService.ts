import { getBranchIdQuery } from "../query/branchQuery";

export const getBranchIdService = async (id: number) => {
  try {
    const res = await getBranchIdQuery(id);
    return res;
  } catch (err) {
    throw err;
  }
};
