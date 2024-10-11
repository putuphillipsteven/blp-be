import { UpdateProfileService } from '../services/profileImageService';
import { Response, Request } from 'express';

export const UpdateProfileController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const newId = Number(id);
		const { image } = req.body;
		const result = await UpdateProfileService(newId, req?.file?.filename || image);
		return res.status(200).json({
			message: 'Update Profile Image Success',
			data: result,
		});
	} catch (err) {
		throw err;
	}
};
