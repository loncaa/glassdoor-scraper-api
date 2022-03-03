export type Experience = {
  title: string;
  company: string;
  location: string;

  period: string;

  description: string;
};

export type Education = {
  university: string;
  degree: string;
  location: string;
  period: string;
};

export type LicenseOrCertificate = {
  title: string;
  company: string;
  period: string;
  description: string;
};

export type GeneralInformation = {
  fullName: string;
  email?: string;
  location?: string;
  title?: string;
  website?: string;
  phoneNumber?: string;
};

export type UserData = {
  general: GeneralInformation;
  about: string;
  experiences: Experience[];
  skills: string[];
  educations: Education[];
  licenseesAndCertificates: LicenseOrCertificate[];
  downloadUri: string;
};
