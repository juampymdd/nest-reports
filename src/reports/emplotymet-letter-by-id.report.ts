import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { getHeaderSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers/date-formatter';

interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompanyName: string;
}
const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 50],
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
};

export const getEmploymentLetterByIdReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerName,
    employerPosition,
    employerCompanyName,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: getHeaderSection({ showLogo: true }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompanyName}, 
                por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra 
                empresa desde el ${employeeStartDate}.\n\n
                Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition},  demostrando  responsabilidad,  compromiso  y  habilidades  profesionales  en  sus 
                labores.\n\n
                La  jornada  laboral  del  Sr./ Sra.  ${employeeName}  es  de  ${employeeHours}  horas 
                semanales,  con  un  horario  de  ${employeeWorkSchedule},  cumpliendo  con  las  políticas  y 
                procedimientos establecidos por la empresa. \n\n
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente.\n\n`,
        style: 'body',
      },
      { text: 'Atentamente,', style: 'signature' },
      { text: `${employerName}`, style: 'signature' },
      { text: employerPosition, style: 'signature' },
      { text: employerCompanyName, style: 'signature' },
      { text: DateFormatter.getDDMMMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
      alignment: 'center',
    },
  };

  return docDefinition;
};
