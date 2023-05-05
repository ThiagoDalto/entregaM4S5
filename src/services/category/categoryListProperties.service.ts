import AppDataSource from "../../data-source";
import { Category } from "../../entities/categories.entity";
import { Property } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const categoryListPropertiesService = async (id: string): Promise<Object> => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoriesList = await categoryRepository.findOneBy({ id });

  if (!categoriesList) {
    throw new AppError("Invalid category id", 404);
  }

  const categoryListProperties = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      property: true,
    },
  });

  const listedCategoriesByProperties = {
    id: categoryListProperties?.id,
    name: categoryListProperties?.name,
    properties: categoryListProperties?.property,
  };

  return listedCategoriesByProperties;
};

export default categoryListPropertiesService;
