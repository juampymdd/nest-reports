import { Content, StyleDictionary, Style } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers/date-formatter';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
const style: StyleDictionary = {
  subheader: {
    fontSize: 16,
    bold: true,
    margin: [0, 0, 0, 20],
  },
};


export const getHeaderSection = (options: HeaderOptions): Content => {

  const { title, subtitle, showLogo, showDate } = options;
  const headerLogo: Content = showLogo ? logo : { text: '' };
  const headerTitle: Content = title ? { text: title, style: 'subheader' } : { text: '' };
  const headerDate: Content = showDate ? { text: `${DateFormatter.getDDMMMMYYYY(new Date())}`, alignment: 'right', margin: [0, 20, 20, 20], style: 'subheader' } : { text: '' };
  return {
    columns: [
      headerLogo,
      {
        stack: [
          headerTitle,
          { text: subtitle, style: 'subheader' },
        ],
      },
      headerDate,
    ],
  };
};
