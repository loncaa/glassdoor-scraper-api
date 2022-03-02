type Experience = {
    title: string;
    company: string;
    companyLocation: string;

    fromTo: string;

    description: string;
}

type Education = {
    school: string;
    degree: string;
    fieldOfStudy: string;

    location: string;
    fromTo: string;

    description: string;
}

type LicenseOrCertificate = {
    title: string;
    issuingOrganization: string;

    fromTo: string;
    description: string;
}

type UserData = {
    fullName: string;
    email: string;
    location: string;
    title: string;

    website: string;
    phoneNumber: string;

    about: string;

    experiences: Experience[];
    skills: string[];
    educations: Education[];
    licenseesAndCertificates: LicenseOrCertificate[];
    fullCV: string;
}