// Main service categories enum
export enum ServiceCategory {
    ConstructionRepair = 'ConstructionRepair',
    ApplianceRepair = 'ApplianceRepair',
    Legal = 'Legal',
    Medical = 'Medical',
    Transportation = 'Transportation',
    SecurityInstallation = 'SecurityInstallation',
    ItAdvertising = 'ItAdvertising',
    Education = 'Education',
    Business = 'Business',
    Household = 'Household'
  }
  
  // Subcategories for each main category
  export enum ConstructionRepairService {
    GeneralRepair = 'GeneralRepair',
    PaintingPlastering = 'PaintingPlastering',
    TileWork = 'TileWork',
    Plumbing = 'Plumbing',
    Electrical = 'Electrical',
    AcSpecialist = 'AcSpecialist',
    Carpentry = 'Carpentry'
  }
  
  export enum ApplianceRepairService {
    Refrigerator = 'Refrigerator',
    WasherDryer = 'WasherDryer',
    KitchenAppliances = 'KitchenAppliances',
    ComputerElectronics = 'ComputerElectronics'
  }
  
  export enum LegalService {
    Lawyer = 'Lawyer',
    ImmigrationSpecialist = 'ImmigrationSpecialist',
    FinancialLaw = 'FinancialLaw',
    DocumentsLicenses = 'DocumentsLicenses'
  }
  
  export enum MedicalService {
    Orthopedist = 'Orthopedist',
    MassageTherapist = 'MassageTherapist',
    Physiotherapist = 'Physiotherapist',
    Psychologist = 'Psychologist'
  }
  
  export enum TransportationService {
    Moving = 'Moving',
    FurnitureAssembly = 'FurnitureAssembly',
    Courier = 'Courier'
  }
  
  export enum SecurityInstallationService {
    LocksDoors = 'LocksDoors',
    VideoSurveillance = 'VideoSurveillance',
    SecuritySystems = 'SecuritySystems'
  }
  
  export enum ItAdvertisingService {
    WebDeveloper = 'WebDeveloper',
    AdvertisingSpecialist = 'AdvertisingSpecialist',
    SmmSpecialist = 'SmmSpecialist',
    TargetingSpecialist = 'TargetingSpecialist'
  }
  
  export enum EducationService {
    MathTeacher = 'MathTeacher',
    ArtTeacher = 'ArtTeacher',
    Tutor = 'Tutor'
  }
  
  export enum BusinessService {
    Accountant = 'Accountant',
    BusinessConsultant = 'BusinessConsultant',
    TenderSpecialist = 'TenderSpecialist',
    InternationalTrade = 'InternationalTrade'
  }
  
  export enum HouseholdService {
    Cleaning = 'Cleaning',
    Handyman = 'Handyman',
    PetCare = 'PetCare',
    BeautyServices = 'BeautyServices'
  }
  
  // Interface for service category metadata
  export interface ServiceCategoryMetadata {
    id: ServiceCategory;
    name: string;
    subServices: SubServiceMetadata[];
  }
  
  // Interface for subservice metadata
  export interface SubServiceMetadata {
    id: string;
    name: string;
  }
  
  // Type that maps each category to its corresponding enum
  export type ServiceSubcategoryMap = {
    [ServiceCategory.ConstructionRepair]: ConstructionRepairService;
    [ServiceCategory.ApplianceRepair]: ApplianceRepairService;
    [ServiceCategory.Legal]: LegalService;
    [ServiceCategory.Medical]: MedicalService;
    [ServiceCategory.Transportation]: TransportationService;
    [ServiceCategory.SecurityInstallation]: SecurityInstallationService;
    [ServiceCategory.ItAdvertising]: ItAdvertisingService;
    [ServiceCategory.Education]: EducationService;
    [ServiceCategory.Business]: BusinessService;
    [ServiceCategory.Household]: HouseholdService;
  }
  
  // Example of how to define the actual service data
  export const serviceCategories: ServiceCategoryMetadata[] = [
    {
      id: ServiceCategory.ConstructionRepair,
      name: 'Ремонтно-строительные услуги',
      subServices: [
        {
          id: ConstructionRepairService.GeneralRepair,
          name: 'Мастера по ремонту квартир и помещений'
        },
        {
          id: ConstructionRepairService.PaintingPlastering,
          name: 'Маляры и штукатуры'
        },
        // ... other subservices
      ]
    },
    // ... other categories
  ];