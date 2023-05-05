import AppDataSource from "../../data-source";
import { Property } from "../../entities/properties.entity";

const propertyListService = async (): Promise<Property[]> => {
    const propertyRepository = AppDataSource.getRepository(Property);

    const properties = await propertyRepository.find()
    
    return properties;
}

export default propertyListService;