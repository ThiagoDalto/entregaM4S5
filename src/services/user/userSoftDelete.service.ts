import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";


const userSoftDeleteService = async (id: string
): Promise<void> => {
 

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

   if (!findUser) {
    throw new AppError("User not found");
  } 

  if(findUser.isActive === false){
    throw new AppError("Missing authorization");
  }
 
 

  await userRepository.update(id, {
    isActive: false,
   
  });

 
};

export default userSoftDeleteService;
