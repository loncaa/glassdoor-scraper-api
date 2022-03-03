import { Education, Experience, LicenseOrCertificate, GeneralInformation } from '../userData.type';

const generalInfoLabelsMapping = ['title', 'location', 'email', 'website', 'phone'];
export function scrapeUserGeneralInfo(sections, $: any): GeneralInformation {
  const section = sections.eq(0);
  const fullName = section.find('div[data-test="sectionHeader"] h3').text();
  let response: GeneralInformation = { fullName };

  const general = section.find('div[class="col-12 col-sm-6 col-lg-4 p-0"]');
  general.each((i, el) =>
    $(el)
      .find('div [class*="profileInfoStyle__wrap"]')
      .each((z: number, elInner) => {
        const label = generalInfoLabelsMapping[i * 2 + z]; //2 items per div
        response[label] = $(elInner).text();
      })
  );

  return response;
}

export function scrapeUserIntroduction(sections, $: any): string {
  const section = sections.eq(1);
  const about = section.find('p[data-test="description"]').text();
  return about;
}
export function scrapeUserSkills(sections, $: any): string[] {
  const section = sections.eq(3);
  const skills = section.find('div[class*=skillsStyle__capitalize] div.css-zomrfc');
  const response: string[] = [];

  skills.each((_, el) => {
    const skill = $(el).find('span').eq(0).text();
    response.push(skill);
  });

  return response;
}

export function scrapeUserExperience(sections, $: any): Experience[] {
  const section = sections.eq(2);
  const experiences = section.find('li[type="experience"]');
  const response: Experience[] = [];

  experiences.each((_, el) => {
    const selector = $(el);
    const title = selector.find('h3[data-test="title"]').text();
    const company = selector.find('div[data-test="employer"] a').text();
    const location = selector.find('label[data-test="location"]').text();
    const period = selector.find('div[data-test="employmentperiod"]').text();
    const description = selector.find('p[data-test="description"]').text();

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

export function scrapeUserEducation(sections, $: any): Education[] {
  const section = sections.eq(4);
  const experiences = section.find('li[type="education"]');
  const response: Education[] = [];

  experiences.each((_, el) => {
    const selector = $(el);
    const university = selector.find('h3[data-test="university"]').text();
    const degree = selector.find('div[data-test="degree"]').text();
    const location = selector.find('label[data-test="location"]').text();
    const period = selector.find('div[data-test="graduationDate"]').text();

    response.push({
      degree,
      university,
      location,
      period,
    });
  });

  return response;
}

export function scrapeUserLicensesAndCertificates(sections, $: any): LicenseOrCertificate[] {
  const section = sections.eq(5);
  const experiences = section.find('li[type="certification"]');
  const response: LicenseOrCertificate[] = [];

  experiences.each((_, el) => {
    const selector = $(el);
    const title = selector.find('div[data-test="title"]').text();
    const company = selector.find('div[data-test="employer"] a').text();
    const period = selector.find('div[data-test="certificationperiod"]').text();
    const description = selector.find('p[data-test="description"]').text();

    response.push({
      title,
      company,
      period,
      description,
    });
  });

  return response;
}
