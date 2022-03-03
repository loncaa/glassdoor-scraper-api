import { Education, Experience, LicenseOrCertificate, GeneralInformation } from '../userData.type';

const generalInfoLabelsMapping = ['title', 'location', 'email', 'website', 'phone'];
export function scrapeUserGeneralInfo($: any): GeneralInformation {
  const fullName = $('section:eq(0) div[data-test="sectionHeader"] h3').text();
  let response: GeneralInformation = { fullName };

  const general = $('section:eq(0) div[class="col-12 col-sm-6 col-lg-4 p-0"]');
  general.each((i: number) => {
    //@ts-ignore
    $(this)
      .find('div')
      .each((z: number) => {
        //@ts-ignore
        const text = $(this).find('[class*="profileInfoStyle__default"]:last-child').text();
        //2 items per div
        const label = generalInfoLabelsMapping[i * 2 + z];
        console.log(label, text);
      });
  });

  return response;
}

export function scrapeUserIntroduction($: any): string {
  const about = $('section:eq(1) p[data-test="description"]').text();
  return about;
}
export function scrapeUserSkills($: any): string[] {
  const skills = $('div[class*=skillsStyle__capitalize___] div.css-zomrfc');
  const response: string[] = [];

  skills.each(() => {
    // @ts-ignore
    const skill = $(this).text();
    response.push(skill);
  });

  return response;
}

export function scrapeUserExperience($: any): Experience[] {
  const experiences = $('section:eq(2) li[type="experience"]');
  const response: Experience[] = [];

  experiences.each(() => {
    // @ts-ignore
    const selector: any = this;
    const title = $(selector).find('h3[data-test="title"]').text();
    const company = $(selector).find('div[data-test="employer"] a').text();
    const location = $(selector).find('label[data-test="location"]').text();
    const period = $(selector).find('div[data-test="employmentperiod"]').text();
    const description = $(selector).find('p[data-test="description"]').text();

    response.push({
      title,
      company,
      location,
      period,
      description,
    });
  });

  return response;
}

export function scrapeUserEducation($: any): Education[] {
  const experiences = $('section:eq(4) li[type="education"]');
  const response: Education[] = [];

  experiences.each(() => {
    // @ts-ignore
    const selector: any = this;
    const university = $(selector).find('h3[data-test="university"]').text();
    const degree = $(selector).find('div[data-test="degree"] a').text();
    const location = $(selector).find('label[data-test="location"]').text();
    const period = $(selector).find('div[data-test="graduationDate"]').text();

    response.push({
      degree,
      university,
      location,
      period,
    });
  });

  return response;
}

export function scrapeUserLicensesAndCertificates($: any): LicenseOrCertificate[] {
  const experiences = $('section:eq(5) li[type="certification"]');
  const response: LicenseOrCertificate[] = [];

  experiences.each(() => {
    // @ts-ignore
    const selector: any = this;
    const title = $(selector).find('h3[data-test="title"]').text();
    const company = $(selector).find('div[data-test="employer"] a').text();
    const period = $(selector).find('label[data-test="certificationperiod"]').text();
    const description = $(selector).find('p[data-test="description"]').text();

    response.push({
      title,
      company,
      period,
      description,
    });
  });

  return response;
}
