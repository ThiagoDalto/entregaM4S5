import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Property } from "../../entities/properties.entity";
import { Category } from "../../entities/categories.entity";
import { IAddressRequest, IPropertyRequest } from "../../interfaces/properties";
import { AppError } from "../../errors/appError";

const propertyCreateService = async ({
  value,
  size,
  address: { district, zipCode, number, city, state },
  categoryId,
}: IPropertyRequest): Promise<Property> => {
  const addressRepository = AppDataSource.getRepository(Address);

  const propertyRepository = AppDataSource.getRepository(Property);

  const categoryRepository = AppDataSource.getRepository(Category);

  const categories = await categoryRepository.find();

  const validCategoryId = categories.find(
    (category) => category.id === categoryId
  );

  if (!validCategoryId) {
    throw new AppError("Invalid CategoryId", 404);
  }

  const addresses = await addressRepository.find();

  const addresAlreadyExists = addresses.find(
    (address) =>
      address.district === district &&
      address.zipCode === zipCode &&
      address.number === number &&
      address.city === city &&
      address.state === state
  );

  if (addresAlreadyExists) {
    throw new AppError("Address already registred", 400);
  }

  if (zipCode.length > 8 || state.length > 2) {
    throw new AppError("Limit of this field has been exceeded", 400);
  }

  const createdAddress: IAddressRequest = addressRepository.create({
    district,
    zipCode,
    number,
    city,
    state,
  });

  await addressRepository.save(createdAddress);

  const createdProperty = propertyRepository.create({
    value,
    size,
    address: { ...createdAddress },
    category: validCategoryId,
  });

  await propertyRepository.save(createdProperty);

  return createdProperty;
};

export default propertyCreateService;
