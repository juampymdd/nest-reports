import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { getHeaderSection } from './sections/header.section';
import { countries as Country } from '@prisma/client';
import { getFooterSection } from './sections/footer.section';

interface ReportOptions {
  title: string;
  subTitle: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subTitle, countries } = options;
  console.log(
    ...countries.map((country) => [
      country.id.toString(),
      country.iso2,
      country.iso3,
      country.name,
      country.continent,
      country.local_name,
    ]),
  );
  const docDefinition: TDocumentDefinitions = {
    header: getHeaderSection({
      showLogo: true,
      showDate: true,
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of Countries',
    }),
    footer: getFooterSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        layout: 'blueHeaders', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [50, 50, 50, '*', 'auto', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
            ['', '', '', '', '', ''],
            [
              '',
              '',
              '',
              '',
              'Total',
              { text: `${countries.length} countries`, bold: true },
            ],
          ],
        },
      },
      {
        text: 'Totales',
        style: {
          bold: true,
          fontSize: 18,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          body: [
            ['Total Countries: ', { text: countries.length, bold: true }],
            [
              'Total Continents: ',
              {
                text: new Set(countries.map((c) => c.continent)).size,
                bold: true,
              },
            ],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
