import { getStatusQuery } from "../query/statusQuery";

export const getStatusService = async () => {
  try {
    const res = await getStatusQuery();
    return res;
  } catch (err) {
    throw err;
  }
};
