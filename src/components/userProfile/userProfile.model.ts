import {
  GeneralInformation,
  Experience,
  Education,
  LicenseOrCertificate,
} from './userProfile.type';

export type UserProfileModel = {
  id: string;
  general: GeneralInformation;
  about: string;
  experiences: Experience[];
  skills: string[];
  educations: Education[];
  licenseesAndCertificates: LicenseOrCertificate[];
  downloadUri: string;
};
